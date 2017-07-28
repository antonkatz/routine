package shenanigans.mobile.routine
import sri.navigation._
import sri.navigation.navigators._
import sri.platform.SriPlatform
import sri.universal.apis.Alert
import sri.universal.components.Button
package object components {

  val root = StackNavigator(
    StackNavigatorConfig(
      cardStyle = GlobalStyles.defaultCardStyle,
      navigationOptions = NavigationStackScreenOptions(
        headerTintColor = "white",
        headerBackTitle = "Back",
        headerStyle = GlobalStyles.defaultHeader
      )
    ),
    registerStackScreen[HomeScreen](navigationOptions = NavigationStackScreenOptions(title = "Routine")),
  )

}
