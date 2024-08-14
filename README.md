# Game Potter Magic Hat

- It took 10 hours to develop this application

## APK Download

- You can download application and test it for Android devices by link - [Download Apk File](https://drive.google.com/file/d/1zNDNMeCsJNhrViVreF5bPgUVLKFY5C3p/view?usp=share_link)

## App Functionality

### Internet Connectivity

- The application **requires an active internet connection**.
  - If there is **no internet connection**, a **warning modal** will appear, informing the user about the lost connection.

### State Persistence

- The application **saves the state** of all character guesses and stats.
  - If the user **closes the application**, the current state is **preserved**.
  - When the app is reopened, all previously guessed characters, total/successful/failed attempts, and other data remain intact.

### Home Screen

- **Display Random Character**: A randomly selected character will be displayed with their **photo** and **full name**.
- **Pull-to-Refresh**: Users can refresh the Home screen to load a different random character using the **pull-to-refresh gesture**.
- **Guess House Affiliation**:
  - Click on **House buttons** (e.g., Gryffindor, Slytherin, Hufflepuff, Ravenclaw) to guess the House affiliation of the character.
  - On every guess, the app will update the following stats:
    - **Total attempts**
    - **Successful attempts**
    - **Failed attempts**
  - The updated stats are displayed in the boxes at the top of the Home and List screens.
- **Reset Button**: Clicking the **Reset** button will:
  - Show modal window to confirm or cancel action
  - If user confirm then it reset all previous guesses ands et all total values (total/success/failed) back to zero.

### List Screen

- **View Previous Guesses**: The List screen shows all previously guessed characters, including:
  - **Successful affiliations**.
  - **Failed attempts**.
  - The number of **attempts** made before a successful guess.
- **Reload Character**:
  - Each character row has a **Reload button**.
  - Clicking it will load that character back to the Home screen, allowing the user to guess the House affiliation again.
- **Character Details**:
  - Clicking on a character row opens the **Details screen**.
  - **Note**: Character information will only be displayed if the House has been guessed **correctly**.

### Details Screen

- **View Detailed Character Information**: Users can view the full information of a character on the Details screen **only if** they have successfully guessed the character's House affiliation.

# Run Project Local

## Step 1: Install dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
#install pods
cd ios
pod install
cd ..

# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
