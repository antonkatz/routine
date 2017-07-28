package shenanigans.mobile.routine

import sri.universal.apis.AppRegistry

object MobileApp {

  def main(args:Array[String]) = {
    AppRegistry.registerComponent("routine", () => components.root)
  }
}
