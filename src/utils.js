const hourInSec = 60 * 60;

export default class Utils {
  static secondsToHuman(seconds, showSeconds = true) {
    let h = Math.floor(seconds / hourInSec).toFixed(0);
    let min = Math.floor((seconds - hourInSec * h) / 60).toFixed(0);
    let s = (seconds % 60) + "s";
    if (!showSeconds) {
      s = ""
    }
    let hStr = "";
    if (h > 0) {
      hStr = h + "h "
    }
    return hStr + min + "m " + s
  }
}