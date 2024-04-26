# CS-465 Full Stack Development.

## Architecture
The front end consists of Express, HTML, JavaScript, and Angular. When using this framework and comparing them to one another found that each holds a specific use when developing a front-end. Express is used as a framework that aims to build web applications more easily compared to traditional web development. HTML is used to construct the webpage in the browser, JavaScript is used as the foundation and is used throughout the project as a whole. The SPA (single-page application) primarily consists of angular and can be incorporated into express to make a dynamic webpage. 
For the database, this project consisted of MongoDB, there are lots of reasons I can think of but one main reason is that MongoDB stores data similar to JSON which is used throughout the project making it easier to integrate into the project. 

## Functionality
As mentioned JSON is used throughout the project it differs from JavaScript mainly because JSON is used for formatting data while JavaScript is a programming language.
One functionality that I modified to improve the performance of the code was in the SPA. During this instance, I found that the API call was not registering then I tested it with Postman. The solution was to refactor the code and find how to successfully get the API passport to work the SPA. I found that the validations were not able to process fast enough or that’s my hunch so I refactored the code I also added a try block to practice other skills I have used in previous courses to have the application fail more smoothly. As a result, I was able to get the API to work with the SPA. 

## Testing 
Testing endpoints is important as they are the last stops where the user goes and uses the app. My understanding of endpoints and the methods that connect each endpoint need to be tested before production. I also found that security measures are needed to have a safe and ideal application as some specific endpoints are meant for specific types of users. 

As for tools I used Postman for endpoint testing and MongoDB Compass for database validation and testing.
## Reflection
This course has helped me understand how a full-stack application works and has added me to a personal project. The skills I have learned include various new languages, techniques, and frameworks. This has changed my outlook in full-stack development. I used to think that I would need to master a specific element before moving on to the next one but found that this could be seen as a form of technical debt, so I should learn how everything works as a whole and take time later to master an element. For example, If I focus on learning the MEAN stack but only concentrate on mastering the HTML aspects of the stack I will lack understanding of the rest of the stack if I learn the general aspect of how the stack works with one another I can go back and have a better understanding on how HTML works and how it correlates with the stack. 