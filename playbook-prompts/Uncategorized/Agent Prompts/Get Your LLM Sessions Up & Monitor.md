# Get Your LLM Sessions Up & Monitor


1. Confirm you have your website hosted where you can host a .txt file (WebFlow you can’t) Hubspot, Wordpress You can.
2. Confirm you have Google Analytics
3. Write a comprehensive LLM.txt file and post it next to your ROBOTS.txt
4. Login to Google Analytics
5. Login to Google Looker Studio
6. Set up Data Connection between the two
7. Visit the [PUBLIC] LLM Traffic Dashboard from AI Notebook
	1. https://lookerstudio.google.com/u/0/reporting/da333731-9ef0-47d4-a3f3-37211fac0aa8/page/p_mjqy3392od


Here is the instructions (or fix)

It looks like the dashboard you are viewing is experiencing a "Data Set Configuration Error" and showing "Looker Studio cannot connect to your data set" in multiple places. This means the underlying Google Analytics data source is currently disconnected or inaccessible.

To connect your Google Analytics data to a Looker Studio dashboard, you generally follow these steps:

🛠️ Steps to Connect Google Analytics to Looker Studio
Go to Looker Studio: Navigate to the Looker Studio website and sign in.

Start a New Data Source: In the top-left corner, click Create and select Data Source.

Choose the Google Analytics Connector: Select the Google Analytics connector from the list.

Authorize Access (if prompted): You may be asked to grant Looker Studio permission to access your Google Account; click AUTHORIZE.

Select Account and Property:

Choose the correct Google Analytics Account you want to use.

Select the specific GA4 Property (or Universal Analytics View) that contains the data for your report. You generally need at least "Read & Analyze" permission for the property.

Connect: Click the CONNECT button in the upper right. This will bring you to the data source configuration page.

Create Report (or Add to Existing Report):

If you're starting a new report, click CREATE REPORT in the top-right corner.

If you're using this data source to try and fix the dashboard you're currently viewing, you would need to go into the report's edit mode and manage the data sources to replace the broken one with the newly connected one.

💡 Fixing the Existing Dashboard
Since the dashboard you are viewing shows a connection error, you may be able to fix the existing data source if you have edit permissions on the dashboard and the underlying Google Analytics property:

Go to Resources: In the report editor, click Resource in the top menu.

Manage Data Sources: Select Manage added data sources.

Edit Connection: Find the Google Analytics data source and click Edit.

Reconnect: Review the connection settings and click Reconnect in the top-right corner to re-authenticate and ensure the correct GA property is selected.