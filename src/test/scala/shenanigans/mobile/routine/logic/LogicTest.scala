package shenanigans.mobile.routine.logic

import org.scalatest._

/**
  * The overreaching tests for the logic module
  */
class LogicTest extends WordSpec {
  "Logic module" when {
    "presented with instructions" should {
      "parse them correctly" in {
        assert(0 === 0)
      }
    }
  }
}
