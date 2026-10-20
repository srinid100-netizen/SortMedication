# Product: SortMedication

Numbered prompts for building the app. Bracketed items such as [name] are placeholders still to be filled in.

## 1. Sign-in (Supabase Auth, email and Google)
Add sign-in to the app using Supabase Auth. Support email and Google.

Explain in plain English what happens to a password, where the session is stored, and what a user sees if they are not signed in.

## 2. Data model
Here is what our app needs to store, in plain English:

[for example: "Users. Each user has projects. Each project has documents and a status. Each document has an AI-generated summary."]

Design the database tables for this in Supabase. Explain each table and each relationship in plain English before you build anything.

Then tell me: what happens if a user deletes a project? What happens to its documents?

## 3. Stock flagging and prediction (Claude API)
I want the app to be able to flag low stocks, flag surplus stocks, and run a prediction on whether stock will become too low or too high based on past activity.

Add a call to the Claude API for this. Explain where to get an API key, how to store it safely as an environment variable, and roughly what each call costs.

Add a sensible fallback message for when the API fails or is slow.

## 4. Vercel Web Analytics
Read CLAUDE.md and prd.md first.

Add Vercel Web Analytics to this app. I have already clicked Enable on the Analytics page for this project in the Vercel dashboard.

If this is a Next.js app, install the @vercel/analytics package and add the Analytics component to the root layout. If it is a plain HTML site with no package manager, tell me so, and follow the HTML instructions in Vercel's Web Analytics quickstart instead.

Explain in plain English what you added, which file it is in, and what it sends to Vercel when somebody opens a page.

Then add Vercel Analytics to the Stack section of CLAUDE.md.

## 5. Supabase env var names
I am about to add a Supabase database. Create a file called .env.local in this project if it does not exist. Add the names of the two variables you will need, one for the Supabase project URL and one for the publishable key, with nothing after the equals signs.

Check that .gitignore lists .env.local. Then tell me the two names.

## 6. Supabase database
Read CLAUDE.md and prd.md first.

Add a Supabase database to this project. I have created the Supabase project and put the project URL and the publishable key in .env.local. Tell me what you expect those two variables to be named, and stop if they do not match.

Here is what the app needs to store, in plain English:

[for example: "Notes. Each note has a title, some text, and the date it was written."]

Explain each table in plain English before you build anything. Give me any SQL to run as one block I can paste into the Supabase SQL Editor, and tell me exactly where to paste it.

Turn on row level security for every table, and explain in plain English who can read and who can change each table.

Then connect the app so that it saves to and reads from the database.

When it works, add Supabase to the Stack section of CLAUDE.md.

## 7. Gemini env var
Create a file called .env.local in this project if it does not exist. Add a line that reads GEMINI_API_KEY= with nothing after the equals sign. Check that .gitignore lists .env.local.

## 8. Gemini API feature
Read CLAUDE.md and prd.md first.

I want the app to [AI feature, for example: "summarize the note the user just wrote in two sentences"].

Add a call to the Google Gemini API for this. Use the @google/genai package and the model gemini-3.5-flash. My key is in .env.local as GEMINI_API_KEY.

The key is secret. Make the call from code that runs on the server, never from the browser, and explain to me in plain English where that code lives and why the browser cannot see the key.

Add a sensible fallback message for when the API fails, is slow, or has hit its free usage limit.

Explain each step as you go.

When it works, add Google Gemini to the Stack section of CLAUDE.md.

## 9. Stripe env var names
I am about to add Stripe Checkout. Create a file called .env.local in this project if it does not exist. Add the names of the two variables you will need, one for the Stripe publishable key and one for the Stripe secret key, with nothing after the equals signs.

Check that .gitignore lists .env.local. Then tell me the two names.

## 10. Stripe Checkout
Read CLAUDE.md and prd.md first.

Add a payment step to this app using Stripe Checkout, the page that Stripe hosts. I have put my Stripe sandbox publishable key and secret key in .env.local. Tell me what you expect them to be named.

The product is [name] and it costs [price, for example $10, one time].

Use test keys only. Refuse to continue if either key starts with pk_live or sk_live.

The secret key must only be used by code that runs on the server. Explain in plain English what happens, step by step, from the moment the user clicks "pay" to the moment they land back on our site.

Add a simple page for a successful payment and one for a cancelled payment.

When it works, add Stripe (sandbox only) to the Stack section of CLAUDE.md.

## 11. Row level security for signed-in users
Read CLAUDE.md and prd.md first.

Add sign-in to the app using Supabase Auth. Support email and Google (same as item 1; do not build it twice).

Explain in plain English what happens to a password, where the session is stored, and what a user sees if they are not signed in.

Then update the row level security rules so that each signed-in user can read and change only their own rows. Give me any SQL as one block for the Supabase SQL Editor, and explain each rule in plain English.

When it works, add Supabase Auth to the Stack section of CLAUDE.md.

## 12. Resend env var
Create a file called .env.local in this project if it does not exist. Add a line that reads RESEND_API_KEY= with nothing after the equals sign. Check that .gitignore lists .env.local.

## 13. Email (Resend)
Read CLAUDE.md and prd.md first.

Add an email to this app using Resend. My key is in .env.local as RESEND_API_KEY.

When [trigger, for example: "somebody submits the signup form"], send [what, for example: "a short welcome email"].

I have not verified a domain, so send from onboarding@resend.dev and send only to [the email address I signed up to Resend with]. Explain what would need to change to email real users later.

The key is secret. Send the email from code that runs on the server, and explain in plain English where that code lives.

If sending fails, the app should carry on working and should not show the user an error.

When it works, add Resend to the Stack section of CLAUDE.md.

## 14. File upload (Supabase Storage)
Read CLAUDE.md and prd.md first.

Add file upload to this app using Supabase Storage. I have created a private bucket called [bucket name].

Users should be able to upload [what, for example: "one PDF or image"]. Accept only [file types] and refuse anything over [size, for example 5 MB], with a clear message.

Explain in plain English where the file goes, who is allowed to open it, and what rule enforces that. Give me any SQL as one block for the Supabase SQL Editor.

Show the user a list of what they have uploaded.

When it works, add Supabase Storage to the Stack section of CLAUDE.md.

## 15. Live weather (Open-Meteo)
Read CLAUDE.md and prd.md first.

Add live weather to this app using the Open-Meteo API, which needs no API key.

Show [what, for example: "today's temperature and chance of rain"] for [place], in [where on the page].

Explain in plain English what request the app sends, what comes back, and how often it asks.

If the request fails or is slow, show a short, friendly message and keep the rest of the page working.

When it works, add Open-Meteo to the Stack section of CLAUDE.md.

## 16. demo-check skill
Create a skill called demo-check that runs through these steps: confirm the app builds, confirm the live URL loads, confirm the signup flow works end to end, and confirm no error messages appear in the browser console.

Explain what a skill is and where you are putting the file as you go.

## 17. Commit-blocking hook
Add a hook that blocks any commit containing a file called .env or .env.local. Explain exactly what it will do, and when it will fire, before you add it.
