FROM ubuntu:latest
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    apt-get update -qq && \
    apt-get install -y locales \
        build-essential \
        curl \
        sudo \
        vim \
        net-tools \
        ncdu \
        git \
        tmux \
        cron \
        htop \
        zsh \
        procps \
        git-flow \
        language-pack-en \
        systemd && \
    useradd -ms /bin/bash ec2-user && \
    sudo usermod -aG sudo,root ec2-user && \
    echo "root:`tr -dc A-Za-z0-9 </dev/urandom | head -c 13`" > /home/ec2-user/root_passwd && \
    cat /home/ec2-user/root_passwd | chpasswd && \
    mkdir -p /home/ec2-user/workspace/ && chown ec2-user: /home/ec2-user/workspace/ && \
    echo "ec2-user:`tr -dc A-Za-z0-9 </dev/urandom | head -c 13`" > /home/ec2-user/ec2-user_passwd && \
    echo "ec2-user  ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers
USER ec2-user
ENV TZ=Asia/Taipei \
    HOME=/home/ec2-user \
    NVM_DIR=/home/ec2-user/.nvm
RUN mkdir -p /home/ec2-user/workspace
WORKDIR /home/ec2-user/workspace
ARG NVM_VER=0.39.1
ARG NODE_VER=16.16.0
ARG PNPM_VERSION=7.6.0
RUN sed 's/ec2-user://g' /home/ec2-user/ec2-user_passwd | sudo chsh -s $(which zsh) && \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
    curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VER/install.sh" | sh && \
    chmod +x ~/.nvm/nvm.sh && \
    . $NVM_DIR/nvm.sh && \
    nvm install --lts && \
    nvm use --lts && \
    curl -fsSL https://get.pnpm.io/install.sh | PNPM_VERSION=$PNPM_VERSION bash -
ENV PATH=$PATH:/home/ec2-user/.nvm/versions/node/v$NODE_VER/bin:/home/ec2-user/.local/share/pnpm/
CMD ["./run_node_env.sh"]

