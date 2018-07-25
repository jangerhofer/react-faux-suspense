import React, { Component, ReactNode } from "react"

interface FauxSuspenseProps {
  timeout: number
  children: ({ timerExpired }: { timerExpired: boolean }) => ReactNode
}

interface FauxSuspenseState {
  timerExpired: boolean
}

export default class FauxSuspense extends Component<FauxSuspenseProps, FauxSuspenseState> {
  private timer: any // any s.t. will work in browser (where appropriate type is window.setTimeout), Node (global.setTimeout), etc.

  constructor(props: FauxSuspenseProps) {
    super(props)
    this.state = {
      timerExpired: false
    }

    const { timeout } = this.props

    if (!timeout) {
      throw new Error("Specify a timeout duration.")
    }

    this.timer = setTimeout(this.expireTimer.bind(this), timeout)
  }

  componentWillUnmount(): void {
    clearTimeout(this.timer)
  }

  private expireTimer(): void {
    this.setState({
      timerExpired: true
    })
  }

  render(): ReactNode {
    const { children } = this.props
    const { timerExpired } = this.state

    return children({
      timerExpired
    })
  }
}
