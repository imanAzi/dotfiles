#!/bin/bash
shopt -s dotglob

DOTFILES_DIR="~/.dotfiles"
echo $DOTFILES_DIR

# install brew
brew bundle --file=$DOTFILES_DIR/brew/Brewfile

# install oh-my-zsh en powerlevel10k theme
cd ~/.config
wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
ZSH="$HOME/.config/.oh-my-zsh" 
sh install.sh
cd
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.config/.oh-my-zsh/custom}/themes/powerlevel10k

# symlink dotfiles with stow
cd ~/.dotfiles
stow --ignore='.git' -vt ~ *

# change shell to zsh 
chsh -s $(which zsh)

source $HOME/.zshrc