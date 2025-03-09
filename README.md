# COVID Vaccine Slot Notifier

A lightweight Node.js application that checks for available COVID-19 vaccination slots in your district and sends desktop notifications when slots become available.

## Overview

This application periodically queries the CoWIN API (India's COVID-19 Vaccination Portal) to check for available vaccination slots in your specified district. When slots matching your criteria become available, it triggers desktop notifications to alert you so you can quickly book your appointment.

## Features

- Automatically checks for vaccination slots every 10 seconds
- Filters results by age group (45+ by default)
- Filters results by pincode/postal code
- Desktop notifications when slots become available
- Saves the latest API response for debugging

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository or download the code
   ```
   git clone https://github.com/yourusername/covid-vaccine-slot-notifier.git
   ```

2. Navigate to the project directory
   ```
   cd covid-vaccine-slot-notifier
   ```

3. Install dependencies
   ```
   npm install
   ```

## Configuration

Edit the `app.js` file to customize the application according to your needs:

### District ID

```javascript
const districtId = 395  // Change this to your district ID
```

You can find your district ID by visiting the CoWIN portal or by using the district list API endpoint.

### Age Group

By default, the application is configured to notify for slots available for the 45+ age group. Modify this filter in the `app.js` file:

```javascript
e.min_age_limit == 45  // Change to 18 for 18+ age group
```

### Pincodes (Postal Codes)

The application is configured to filter results for specific pincodes. Modify the array to include pincodes relevant to your area:

```javascript
[400027, 400008, 400011, 400010, 400028, 400013, 400005, 400001, 400003, 400016]
```

## Usage

Run the application:

```
node app.js
```

The application will start and run in the background, making API requests every 10 seconds. When vaccine slots that match your criteria become available, you'll receive desktop notifications.

You can check the console for request status logs, and the `lastResponse.json` file for the most recent API response.

## How It Works

1. The application makes requests to the CoWIN public API every 10 seconds
2. It checks if any vaccination centers have available slots for your specified age group and pincodes
3. If slots are available, it triggers desktop notifications with center name and available slot count
4. All responses are saved in `lastResponse.json` for debugging

## Notes

- The CoWIN API may have rate limits - be respectful of these limits
- The application uses a custom user agent to avoid being blocked
- This is meant as a notification tool only and doesn't book slots for you

## Troubleshooting

- If you're not receiving notifications, check that your system allows desktop notifications
- If the API calls are failing, check the console for error messages
- Inspect the `lastResponse.json` file to see the raw response from the API


## Disclaimer

This tool is provided for educational and informational purposes only. Please use responsibly and in accordance with the terms of service of the CoWIN platform.
