# Cryptocurrency Store
> Check realtime list of coins supported in [CoinGecko](https://www.coingecko.com/en) and purchase based on market price
---
## Thought Process
- The plan is to get the feel of working with a team when you're reading this project or readme, including the merge requests. A reason behind why I have multiple MRs (think of these as tickets) and I did it consecutively, dependent and pointed on the one before.

- Ideally, tests + the feature itself should be in one MR or separate but will go to one `feature+test branch` before merging to develop. But with the time constraint, I did the tests last, even after the bonus feature so I could see the app working.

- I chose Redux Toolkit / RTK Query only because I haven't used it yet but I've read it 3 weeks ago. Same reason for using @react-navigation v6 and the new async-storage. All of these I haven't upgraded too with the projects I am currently working on. Right now, I don't think I'd want to use other libraries anymore for state management (RTK 🚀🚀🚀) except for `Apollo Client 3` if we'll go full gql. 😂

- I chose this design since it has a modern feel and simplicity. Coin details are placed and colored in a way that users will easily read it and most likely to add coins in cart. This is a familiar UI/UX for traders/investors on phone.

- Without the additional filters like categories of coins, Coins List can be overwhelming for some users but since they are discovering more, they'll might see a few interesting coins that they'd want to try or research.

- Design-wise, I've written the colors in a way that can be easily edited by a developer, a theme file. For simplicity, I didn't use my go to stylesheet `react-native-extended-stylesheet` -- stylesheet on steroids + rem units. 🤯

- For the pin screen, I found a library called `@haskkor/react-native-pincode` which luckily I already have most of the dependencies. If I had more time, I would have just made this from scratch.

- Lastly, this is written in React-Native + TypeScript, in a state colocation approach and will work on both iOS and Android. In addition, this is utilizing and depending on a few well-written libraries known in RN Community.
---
## Features:

### UI
- UI is inspired with `#Binance`
- Color theme is somewhat like `#CoinGecko` in Dark Theme *only*

### Screens (using @react-navigation v6)
I. PreAuth Route
  1. PinCode Screen as default screen on open (requires 4 digit pin and has 3 attempts -- 5 minutes to wait)

II. Main Route - Bottom Tab
  1. Market Tab
     - CoinsList Screen w/ filter buttons of vs_currencies supported and infinite scrolling of **9000+ coins**
     - Search Screen w/ filter buttons of vs_currencies supported and textInput for search (name/symbol). *Used `lodash.debounce` for those who types fast and avoid querying multiple times*

  1. Trades Tab
     - Trade Screen - list of coins added to cart from pop up, this is where to purchase and edit amount of existing amount
     - Order Screen - list of coins purchased from cart w/ date, filled, amount and total details

### Folder Structure
- [State colocation](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster) - my default folder structure that also helps various dev problems in front end like, prop drilling, state management, readability and improves speed
- [Principle of colocation:](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster#what-is-colocated-state) `Place code as close to where it's relevant as possible`
- DRY as much as possible -- create and design components as if they can be reused in the future
- Always make sure that a function/component does a single thing, otherwise, decouple them and create a new file if necessary
### Notable other components:
- Centered Modal for add to trade pop up
- CoinFilters - `unit buttons` based on supported units from vs_currencies endpoint
- Quantity controller for increase/decrease
- Button - reusable button component
- Empty State - reusable empty component w/ centered label and SearchPlaceholder component
- Trade Card - reusable component for adding amount of chosen coin pair and has coin details
- CoinListItem - row of coin that contains, vol 24, change 24%, maketprice, symbol/unit

### Data
- Handled in state management library `Redux ToolKit` - abstracted and opinionated
- Data is persisted using `redux-persist` and `AsyncStorage` as storage
### Security
- Encrypted with 256-bit AES key (`redux-persist-transform-encrypt`)
- Every open of app goes to PinScreen (`@haskkor/react-native-pincode`) that requires 4-digit number and is saved in `react-native-keychain` other deps: `react-native-vector-icons` and `react-native-exit-app`

### Dates
- `dayjs` instead of momentjs - for minimal/smaller size
### Network
- `Redux Toolkit Query` data fetching and caching tool, plus it supports polling and auto-generates hooks for you 😮
### Endpoints
- BASE_URL - `https://api.coingecko.com/api/v3`
- `/simple/supported_vs_currencies` (for coinfilters, categorized into BTC, ALTS, FIAT)
- `/coins/list` (for list of coin requests [ids, sym, name -- paginated into 50 sub-arrays for infinite scrolling])
- `/simple/price` (for list/specific coin details -- for polling and infinite scrolling in list)

### Hermes Debugging
- Hermes Support of RND [here](https://github.com/jhen0409/react-native-debugger/issues/573) and how to use Chrome devTools for HERMES [here](https://reactnative.dev/docs/hermes#debugging-js-on-hermes-using-google-chromes-devtools)

### Notes: 
- Release branch is built on top of [Bonus branch (feature/security-pin-encrypt) - Security pin and async-storage encryption](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/8)
- [Testing Branch](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/9) is **WIP** due to time constraints and random errors -- not included in Release Branch 🥲
-  No sell  and futures long/short features yet.
- Payment feature or even available balance not yet supported.
---
## Merge Requests
> Each one is dependent and pointed on the number before
> 
> Check the MRs for more information and gifs/clips a feature

1. [Set Initial configurations](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/1)
2. [Set up navigation](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/2)
3. [Coins List Screen](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/3)
4. [Search Feature/Screen](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/4)
5. [Cart Screen](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/5)
6. [History of Orders](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/6)
7. [Release builds set up and bug fixes](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/7)
8. [Bonus: Pin and encryption](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/8)
9.  [RELEASE BRANCH - Compilation of MRs 1-8](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/10)
10. [WIP: Tests](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/merge_requests/9)

---
## Get Started

### To Run
```bash
  $: npm i # add flag --legacy-peer-deps if necessary
  $: npx pod-install ios # for iOS cocoapods
  $: npm run android # or iOS
```

if it doesn't run try this:
```bash
  $: cd android && ./gradlew clean && cd ..
  $: npx react-native start # or react-native start -- reset-cache
  $: npx react-native run-android # run-ios
```

or change the cli as the last option
```bash
  $: npm uninstall -g react-native-cli
  $: yarn global add @react-native-community/cli # then run the project again with "npm i android"
```

### To Bundle
```bash
  $: npm run bundleAndroid # or bundleiOS for iOS
```

### Android: Bundle and build signed release apk via cli
```bash
  $: npm run bundleAndroid && cd android && ./gradlew assembleRelease && open app/build/outputs/apk/release && cd ..
```

### iOS: Build and Archive in XCODE + getting the .IPA file

1. Product menu → Scheme → Edit Scheme → Run → Info Tab → Build Configuration → Release
2. `Clean Build Folder` under `Product menu`
3. Choose `generic IOS device` / `any iOS device`
   
   *if trusted real device is preferred for debugging release, attach an iphone to your machine and choose that in the dropdown*

4. `Build` under `Product menu`
5. tap `Archive` under `Product menu` (will automatically show Organizer)
6. to see `Archives` under `Window menu → Organizer`
7. create .ipa file
- [w/o enrolling in apple development program](https://stackoverflow.com/a/54033499/9357840)
- [via Organizer → Distribute App → ... → Export](https://stackoverflow.com/questions/5499125/how-to-create-ipa-file-using-xcode)
---
### [Link to Android apk and iOS ipa](https://drive.google.com/drive/folders/1WyRugyv-Ixg_qDbfvGWVjPOekkQVDfEz?usp=sharing) (created w/o enrolling in apple development program)
---
## Tools
- Text Editor: `VSCode`
- Favorite VSCode Extension: `Gitlens`
- Terminal: `iTerm2 w/ oh-my-zsh and ZSH_THEME="powerlevel9k/powerlevel9k"`
- `Android Studio` Bumblebee 4.2 and `gradle` to v7.0.2
- `Xcode` v12.5.1
- Machine OS: `Mac`

---
## Others
- Known Issues [here](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/issues)
- Release Branch [package.json](https://gitlab.com/ramirez.jag00/cryptocurrencystore/-/blob/release/package.json)
---
## Future features
- Delight or any nice to have features ie. subtle animations on payment success, change status gif per status.
- Distinct design, colors and ui that users will identify that "this" app is CoinGecko. (definitely need to work with a ui/ux with a lot of experience with apps)
- More subtle animations coz trading apps are actually boring in terms of ui
-  No splashscreen or app icon yet.
- Coin Category filters
- Sell and Future long/short
- [Charts](https://www.youtube.com/watch?v=r5XXSb4yQes) - This one I definitely want to add only if I had access to a pro level api that actually changes the market price more than 1 sec.
- Clear Trades Button - to clear all added coins in cart
- Payment Feature
- Log in / Sign up Feature
- Settings and user specific configurations
- [Configuration-Driven-Development](https://medium.com/captech-corner/an-intro-to-configuration-driven-development-cdd-48a1c088baa9) - in case we need to turn off a feature especially even it was released
- More security with authenticator and email
- Internationalization w/ `react-intl` - Dictionary implementation of all copies to easily convert texts to any language ie. English, Filipino etc.
- Offline pop ups / offline handling
- Handling cache or fail safe on times of servers have a lot of traffic (RIP Binance Apr/May 2021 ) and app doesn't seem to work
- skeleton loading if needed or progressive image loading
- More error pop ups
- Report bugs feature
- New App Version pop up feature
- Fastlane or App Center
- [Environmentalization](https://around25.com/blog/manage-staging-and-production-environments-for-react-native-app/) (DEV, TEST, STAGING, PROD)
---