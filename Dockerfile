FROM 265681005590.dkr.ecr.ap-southeast-2.amazonaws.com/base-images:node-lts-buster-slim16.13 as builder

ARG ENV
ARG MAX_OLD_SPACE_SIZE=6144
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

# preload package.json
COPY ./package.json /opt/app/
COPY ./yarn.lock /opt/app/
COPY ./patches /opt/app/patches

WORKDIR /opt/app

RUN if [ "$ENV" = "test" ] ; then mkdir build ; else yarn install --silent ; fi
COPY . /opt/app
RUN if [ "$ENV" = "test" ] ; then echo "Hello Kitty" > build/index.html ; else yarn build ; fi

# RUN mkdir build
# RUN touch build/index.html

FROM 265681005590.dkr.ecr.ap-southeast-2.amazonaws.com/base-images:node-lts-buster-slim16.13

COPY --from=builder /opt/app/build /opt/app
