# Fig pre block. Keep at the top of this file.
[[ -f "$HOME/.fig/shell/zshrc.pre.zsh" ]] && . "$HOME/.fig/shell/zshrc.pre.zsh"
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

##############################Fig pre block. Keep at the top of this file##############################
##############################oh-my-zsh config:##############################
# Path to your oh-my-zsh installation.
export ZSH=$HOME/.config/.oh-my-zsh

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
#ZSH_THEME="robbyrussell"
ZSH_THEME="powerlevel10k/powerlevel10k"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
zstyle ':omz:update' frequency 13

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
HIST_STAMPS="dd/mm/yyyy"

#the fuck config
# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
    git
    colored-man-pages
    chucknorris
    zsh-navigation-tools
    zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

##############################User configuration##############################
#paths
export PATH="/usr/local/bin/:$PATH"
export PATH="/usr/local/bin/brew:$PATH"
export PATH="/usr/local/sbin:$PATH"
export PATH="$PATH:~/.local/bin/"
export PATH="/opt/homebrew/bin:$PATH"
export GOPATH=~/go
export PATH=$GOPATH/bin:$PATH

#gradle config
export GRADLE_USER_HOME="~/.gradle"
export ARTIFACTORY_USER="iazimnia"
export ARTIFACTORY_API_KEY="AKCp8kr1CdTDD8jN2fmtZHG2DXTyQhBYczTY3e4NQ11LPgfcmh9hNU33E1zf1UFhN371K7WAw"

#aws config
export AWS_PROFILE=default
export AWS_DEFAULT_REGION=eu-west-1
export AWS_DEFAULT_SSO_START_URL=https://d-93677093a7.awsapps.com/start
export AWS_DEFAULT_SSO_REGION=eu-west-1

#zscaler config
export REQUESTS_CA_BUNDLE=~/.zcli/zscaler_root.pem
export NODE_EXTRA_CA_CERTS=~/.zcli/zscaler_root.pem
export AWS_CA_BUNDLE=/opt/homebrew/lib/python3.9/site-packages/certifi/cacert.pem

#python config
export PATH="$PATH:/Users/iazimnia/.local/bin"
export PATH="$PATH:/Users/iazimnia/Library/Python/3.9/bin"

#p10k config
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh


###################################aliases####################################
#movement in terminal
alias l="ls -lah"
alias e="exa -lbhHigUmuSa --time-style=long-iso --git --color-scale"
alias c="clear"
alias sz="source ~/.zshrc"
alias .h="cd"
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias h="history"
alias hf='history | grep'
alias j="jobs -l"
alias lp10="ps aux | sort -nr -k 3 | head -10"
alias ping="ping -c 5"
alias v="nvim"
alias vsext="code --list-extensions >> ~/.dotfiles/vscode/vscode-extenstions.txt"

#aws
alias avl="aws-vault login"
alias ave="aws-vault exec"
alias avu="unset AWS_VAULT"
alias alog="aws-sso-util login"
alias alogw="aws sso login --profile the_shire_wrapped && aws2-wrap --generate --profile the_shire_wrapped --credentialsfile ~/.aws/credentials --configfile ~/.aws/config --outprofile Wrapped"

alias ashire="export AWS_PROFILE=the_shire_a"
alias ashirew="export AWS_PROFILE=the_shire_wrapped"

#python
alias python="python3 -m"
alias pip="pip3"

#git
alias ga="git add"
alias ga.="git add ."
alias gbr="git branch"
alias gcm="git commit -m"
alias gcl="git clone"
alias gch="git checkout"
alias gchm="git checkout master"
alias gps="git push"
alias gpsu="git push -u"
alias gpsuo="git push -u origin"
alias gpl="git pull"
alias gdiff="git diff origin/master..HEAD"

##############################asdf config##############################
. /opt/homebrew/opt/asdf/libexec/asdf.sh

##############################Fig post block. Keep at the bottom of this file##############################

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Fig post block. Keep at the bottom of this file.
[[ -f "$HOME/.fig/shell/zshrc.post.zsh" ]] && . "$HOME/.fig/shell/zshrc.post.zsh"
