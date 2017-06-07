FROM mhart/alpine-node-auto
RUN mkdir mkdir -p usr/src/dockerFile
WORKDIR usr/src/dockerFile
COPY . .
RUN npm install
CMD ["npm","start","--production"]
