# SMTP
## our own nodemailer oauth2

### see example here: https://github.com/nodemailer/nodemailer/blob/master/examples/oauth2.js

### first thing to do
    1. npm i (to install all the dependencies on package.json)
    2. and run npm start on your terminal

### how to get your key etc?
	see here: https://support.google.com/googleapi/answer/6158862
	step:
	1. got to your console API google: https://console.developers.google.com/apis/library?project=poppins-142912
	2. create a project
	3. create crdential
	4. choose oAuth clientID
	5. click website service radio button
	6. and you got client ID and secret
	7. and go visit this link: https://developers.google.com/identity/protocols/OAuth2WebServer

### use POSTMAN 2 times
1. GET: https://accounts.google.com/o/oauth2/v2/auth?scope=https://mail.google.com/&redirect_uri=https://nodemailer-nybgxooqyh.now.sh/oauth2callback&response_type=code&client_id=984872888741-8bo9b9ltdjd42cm45jd0gi1rlpj7uo5c.apps.googleusercontent.com&access_type=offline

redirect_uri & client_id : the same as your credential app redirect_uri & client_id
it will response 404 page, but you just need the "code". save the code for the next step

2. POST: https://www.googleapis.com/oauth2/v4/token?code=4/DF52Cg15pFjT_NzxjmgpjRSh4Qs8XaHOAPlz3n9Tsds&client_id=984872888741-8bo9b9ltdjd42cm45jd0gi1rlpj7uo5c.apps.googleusercontent.com&client_secret=JyMrCK9bOdVjz1ZQXoc5b-M3&redirect_uri=https://nodemailer-nybgxooqyh.now.sh/oauth2callback&grant_type=authorization_code

code is code, client_id is still the same, client_secret: you can see it at you credential too,
take the access_token from the response.

and now you'll have all the things you need.


then the cool part, you can have your very own smtp online with zeit.
simply follow this 3 steps:
    1. npm i -g now
    2. go to the file directory
    3. now "or" /usr/local/Cellar/node/6.3.1/bin/now
    4. wait till it done uploading, and save the url they gave you in the terminal
    5. go to postman, and have fun
