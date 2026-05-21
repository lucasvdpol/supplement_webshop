FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN ls -l /app/dist
RUN ls -l /app/dist/ffsdemo1


FROM nginx:alpine
COPY --from=build /app/dist/ffsdemo1/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
