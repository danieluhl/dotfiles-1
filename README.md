# dotfiles
> Configuration files for `zsh`, `vim`, and `tmux` heavily inspired by https://github.com/thoughtbot/dotfiles.

## Installation
```sh
# Install configuration management tools
brew tap thoughtbot/formulae
brew install rcm

# to enable z functionality
brew install z

# Clone oh-my-zsh
git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

# Clone dotfiles
git clone https://github.com/danieluhl/dotfiles-1.git

# Link files
rcup -d .
```

Note: This expects `~/.gitconfig` to be controlled by [boxen][boxen] and for
boxen include `~/.gitconfig.dotfiles` as an additional configuration file.
([boxen configuration example][boxen-git-example])

[boxen]: https://github.com/boxen/our-boxen/
[boxen-git-example]: https://github.com/blamattina/my-boxen/commit/0cbfab174a1d33d19d5f4f207d4b503805dbf480?diff=unified

## Customizations
Place configuration for a specific computer or environment in files with the
`.local` extension.

Supported Local Files:
- `~/.aliases.local`
- `~/.gitconfig.local`
- `~/.tmux.conf.local`
- `~/.vimrc.local`
- `~/.vimrc.bundles.local`
- `~/.zshrc.local`

# Other typical installs
- slate
- alfred
- seil
- karabiner
- screenflow
- bartender