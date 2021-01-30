  
import React,{Component} from 'react'
import { Appearance, ColorSchemeName, StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native';

interface UserContext {
  mode: ColorSchemeName;
  setMode:(mode: ColorSchemeName) => void
  theme: object,
  styles: StyleSheet.NamedStyles<IStyleProps> | null
}

interface IStyleProps {
  text: TextStyle,
  background: ViewStyle
}

export const ThemeContext = React.createContext<UserContext>({
  mode: 'light',
  setMode: () => {},
  theme: {},
  styles: null
})

interface ThemeProviderProps {}
interface ThemeProviderState {
  mode: ColorSchemeName;
}

class ThemeProvider extends Component<ThemeProviderProps,ThemeProviderState,{}> {
  public state: ThemeProviderState
  private subscription: any;
  constructor(props: ThemeProviderProps){
    super(props);
    this.state={
      mode: 'light'
    }
    this.subscription = undefined;
    this.setMode = this.setMode.bind(this);
  }


  private get lightTheme() {
    return {
      text: '#202020',
      background: '#ffffff',
    }
  }

  private get darkTheme() {
    return {
      text: '#ffffff',
      background: '#202020',
    }
  }

  protected setMode(mode: ColorSchemeName){
    this.setState({ mode })
  }

  protected get styles(): StyleSheet.NamedStyles<IStyleProps> {
    return StyleSheet.create({
      text:{
        color:  this.state.mode === "dark" ? this.darkTheme.text : this.lightTheme.text
      },
      background: {
        backgroundColor: this.state.mode === "dark" ? this.darkTheme.background : this.lightTheme.background
      }
    })
  }

  public componentDidMount() {
    this.subscription = Appearance.addChangeListener(({ colorScheme }) => this.setMode(colorScheme))
  }

  public componentWillUnmount() {
    this.subscription.remove();
  }

  render(){
    return(
      <ThemeContext.Provider value={{
        mode: this.state.mode,
        setMode: this.setMode,
        styles: this.styles,
        theme: this.state.mode === "dark" ? this.darkTheme : this.lightTheme,
      }}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}
export const useTheme = () => React.useContext(ThemeContext)

export default ThemeProvider;