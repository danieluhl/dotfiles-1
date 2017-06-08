# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="robbyrussell"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

# User configuration
PATH=$PATH:/usr/local/bin
PATH=$PATH:/usr/local/share/npm/bin
PATH=$PATH:/usr/local/lib/node_modules
PATH=$PATH:/Users/duhl/git/sync/resources/node_modules/grunt-sass/node_modules/node-sass/bin
PATH=$PATH:/usr/local/php5/bin

source /Users/duhl/git/wf/wf_complete_zsh

function npm-do { (PATH=$(npm bin):$PATH; eval $@;) }

# Load boxen environment
#source /opt/boxen/env.sh

# Load local environment
[[ -f ~/.env ]] && export $(cat ~/.env)

# Load oh-my-zsh
source $ZSH/oh-my-zsh.sh

# Load git completion
source ~/.git-completion.sh

# Load tmuxifier: https://github.com/jimeh/tmuxifier
#export PATH="$HOME/.tmuxifier/bin:$PATH"
#export TMUXIFIER_LAYOUT_PATH="$HOME/.tmux-layouts"
#eval "$(tmuxifier init -)"

# Set empty terminal title for tmux
#printf '\033]2;\033\\'

# Set editor to vim
#export EDITOR=vim

# Load plug
#if [ ! -e "$HOME"/.vim/autoload/plug.vim ]; then
#  curl -fLo "$HOME"/.vim/autoload/plug.vim --create-dirs \
#      https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

#   vim -u "$HOME"/.vimrc.bundles +PlugInstall +PlugClean! +qa
# fi

# Load z
. `brew --prefix`/etc/profile.d/z.sh

# Load aliases
[[ -f ~/.aliases ]] && source ~/.aliases

# Local config
[[ -f ~/.zshrc.local ]] && source ~/.zshrc.local

# add to .zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm


# config opam (ocaml package manager)
. /Users/duhl/.opam/opam-init/init.zsh > /dev/null 2> /dev/null || true
export PATH="/Users/duhl/bin:$PATH"

export PATH="/Users/duhl/bin:$PATH"

export PATH="/Users/duhl/bin:$PATH"

export PATH="/Users/duhl/bin:$PATH"

export PATH="/Users/duhl/bin:$PATH"
