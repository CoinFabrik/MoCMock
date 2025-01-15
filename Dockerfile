FROM node:18-bullseye-slim
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        build-essential \
        python3 && \
    rm -fr /var/lib/apt/lists/* && \
    rm -rf /etc/apt/sources.list.d/*

RUN mkdir -p /home
WORKDIR /home
COPY . /home/
RUN npm install
RUN npx hardhat compile
ENV HARDHAT_IGNITION_CONFIRM_DEPLOYMENT=false
ENTRYPOINT ["npx", "hardhat", "ignition", "deploy", "./ignition/modules/Lock.ts", "--network", "docker"]
