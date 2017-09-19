export default class Utils {
  static secondsToHuman(seconds) {
    let h = Math.floor(seconds / (60 * 60)).toFixed(0)
    let min = Math.floor(seconds / 60).toFixed(0)
    let s = seconds % 60
    let hStr = ""
    if (h > 0) {
      hStr = h + "h "
    }
    return hStr + min + "m " + s + "s"
  }
}