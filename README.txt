This program will allow a user to choose a GitHub user name to search for and then it will display the basic details of that user in a web server that it creates.  The server runs at http://127.0.0.1 on port 8081 on the local machine the program is running.

The program is the first program I have written in NodeJS.  Overall it is a simple program, but it is effective at performing the task it was designed to do. 

First the program will prompt the user for a GitHub username to search for in the command console.  If the user does not enter a user name the default user name is 'github.'  If a user does not enter a regular expression the default user name is used again.  If the user enters a user name and presses enter the program will find the user through a GET request. Next the program will store the JSON data in a global variable as a string.  The JSON data will then be parsed and displayed on the server in a simple vertical format.  There was not a lot of work put into the design of the display, and functionality was the priority.   

If there are any questions regarding this feel free to contact me at nickgrok@gmail.com.

All the best!!
Nick
