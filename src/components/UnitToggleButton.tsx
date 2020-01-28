import * as React from "react";

interface IUnitToggleButtonProps {
  onUnitChange: (checked: boolean) => void,
  isCelsius: boolean
}

class UnitToggleButton extends React.Component<
  IUnitToggleButtonProps,
  {}
> {

  constructor(props: Readonly<IUnitToggleButtonProps>){
    super(props);
    this.state = {
      checked: false
    };

    this.onUnitChange = this.onUnitChange.bind(this);
  }

  onUnitChange(event: React.ChangeEvent){
    let checked = !this.props.isCelsius

    this.props.onUnitChange(checked);
  }

  render() {
    return (
      <div className="unit-toggle">
        <input type="checkbox" onChange={this.onUnitChange} checked={this.props.isCelsius} />
        <div className="toggle-labels">
          <div>&deg;F</div>
          <div>&deg;C</div>
        </div>
        <div className="toggle-box">
          <div className="toggle-circle"></div>
        </div>
      </div>
    );
  }
}

export default UnitToggleButton;
