const path = require('path');

module.exports = {
    dependecy: {
        platforms: {
            ios: {
                podspecPath: path.join(__dirname, 'react-native-my-library.podspec')
            },
            android: {
                packageImportPath: 'import com.reactLibrary.MyLibraryPackage',
                packageInstance: 'new MyLibraryPackage()',
            }
        }
    }
}