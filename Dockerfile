FROM swr.cn-north-4.myhuaweicloud.com/iscas-isrc/front-base:latest AS build
WORKDIR /source
COPY . /source
RUN npm install && npm run build
RUN cp -r dist /opt/exam

FROM nginx:alpine
COPY --from=build /opt/exam /usr/share/nginx/html
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8