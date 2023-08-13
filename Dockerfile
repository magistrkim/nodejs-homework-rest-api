#1 we are starting from node.js
FROM node

#2 then command which create working derictory
WORKDIR /app

#3 copy project files into app folder from where to where
COPY . . 

#4 install all packages from package.json
RUN npm install 
#4.1 we need to launch the project on the proper port
EXPOSE 3000

#5 launch project with "node server" command "start" from package.json
CMD ["node", "server"]
