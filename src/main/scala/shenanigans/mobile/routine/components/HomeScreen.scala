package shenanigans.mobile.routine.components

import sri.macros.{OptDefault => NoValue, OptionalParam => U}
import sri.navigation._
import sri.universal.components._
import sri.universal.styles.InlineStyleSheetUniversal

import scala.scalajs.js


class HomeScreen extends NavigationScreenComponentS[HomeScreen.State] {
  import HomeScreen._

  initialState(State("test"))

  def changeText(text: String) = {
    println("my console log", state)
    this.setState((s: State) => s.copy(textInput = text))
  }

  def render() = {
    View(style = styles.container)(
//      TextInput(onChangeText = (t: String) => changeText(t), style = styles.input),
      TextInput(onChangeText = changeText(_), style = styles.input),
      Text()(state.textInput)
    )
  }

  @inline
  def getBlock(onPress: () => _, title: String) =
    TouchableOpacity(
      style = styles.block,
      onPress = onPress,
      activeOpacity = 0.8
    )(
      Text(style = styles.blockText)(title)
    )
}

object HomeScreen {
  case class State(textInput: String)


  object styles extends InlineStyleSheetUniversal {

    import dsl._

    val container = style(
      flex := 1,
      padding := 20,
      flexDirection.row,
      flexWrap.wrap
    )

    val input = style(
      borderColor := "black",
      borderStyle := "solid",
      borderWidth := 1,
      width := 300
    )

    val block = style(
      width := "42%",
      height := 120,
      backgroundColor := "white",
      borderColor := "#eee",
      borderRadius := 2,
      margin := 10,
      paddingHorizontal := 3,
      shadowColor := "grey",
      shadowOpacity := 0.5,
      shadowRadius := 2,
      shadowOffset := js.Dynamic.literal(height = 1, width = 0),
      elevation := 3,
      borderWidth := 1,
      justifyContent.center,
      alignItems.center
    )

    val blockText = style(fontWeight := "500", fontSize := 14)
  }
}
