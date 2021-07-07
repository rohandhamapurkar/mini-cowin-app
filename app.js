// notifier to push windows/mac notifications
const notifier = require("node-notifier")
const axios = require("axios")

// request every 10 seconds
setInterval(main, 10000)

// pincode and date string constants
const districtId = 395
const today = new Date().toISOString().replace(/T.*/, "").split("-").reverse().join("-")
const apiURL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${today}`

// make the request headers object
const requestHeaders = {
	accept: "application/json",
	"Accept-Language": "en_US",
	"user-agent": "Chrome/51.0.2704.105 Safari/537.31 OPR/38.0.2220.47",
}

async function main() {
	try {
		// make the api call
		let response = await axios(apiURL, {
			headers: requestHeaders,
			authority: "cdn-api.co-vin.in",
			origin: "https://www.cowin.gov.in",
			referer: "https://www.cowin.gov.in/",
			// referrerPolicy: "strict-origin-when-cross-origin",
			method: "GET",
			mode: "cors",
		})
		console.log(new Date().toLocaleString(), "Request status", response.status)

		response.data = Object.assign({ date: today }, response.data)

		require("fs").writeFileSync("lastResponse.json", JSON.stringify(response.data, null, 2))
		// check if hospital sessions are available for a pincode
		if (response.data && response.data.sessions && response.data.sessions.length) {
			// for each hospital push the notification
			for (let obj of response.data.sessions.filter(
				(e) =>
					e.min_age_limit == 45 &&
					[400027, 400008, 400011, 400010, 400028, 400013, 400005, 400001, 400003, 400016].includes(e.pincode)
			)) {
				notifier.notify({
					title: `Slot available for ${obj.vaccine}`,
					message: `Location: ${obj.name}\nSlots available: ${obj.available_capacity}`,
				})
			}
		}
	} catch (e) {
		console.error(e)
		notifier.notify({
			title: "Some error occured while requesting",
			message: e.message,
		})
	}
}

// main().then().catch()
