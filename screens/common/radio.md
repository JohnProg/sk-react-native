# react-native-radio

A react component to implement radio-llike behaviors: multiple options, only on can be selected at once.

## Install

_Note:_ not published yet!

```
npm i -S react-native-radio
```

## Usage

Here is an extensive overview of the component usage.

```jsx

render() {
  const options = [
    "Option 1",
    "Option 2"
  ];

  function setSelectedOption(selectedOption){
    this.setState({
      selectedOption
    });
  };

  function renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold'} : {}

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
    );
  }

  function renderContainer(optionNodes){
    return <View>{optionNodes}</View>;
  }

  return (
    <View style={{margin: 20}}>
      <Radio
        options={ options }
        onSelection={ setSelectedOption.bind(this) }
        selectedOption={this.state.selectedOption }
        renderOption={ renderOption }
        renderContainer={ renderContainer }
      />
      <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
    </View>)
  ;
}

```

Will render this

![Example](./radio.gif)

## Props

* `options - []` mandatory array of anything, will be passed to `renderOption`
* `onSelection - function(option){}` option selection callback
* `selectedOption - option` the initially selected option, optional
* `renderOption - function(option, selected, onSelect, index)` should return an option node, default generate `<Text>` nodes and adds `{fontWieght:'bold'}` to the selected option.
* `renderContainer - function(optionsNodes)` must render the container, default is Radio.renderVerticalContainer (see below)

## Helpers
**Radio.renderVerticalContainer;**

A super simple `renderContainer` function that generates a <View> with `{flexDirection: "column"}`. It is used as default `rendeContainer` if you don't specify it.

Usage:
```
<Radio
  options={ options }
  onSelection={ setSelectedOption }
  renderContainer={Radio.renderVerticalContainer}
/>
```

**Radio.renderHorizontalContainer;**

Another super simple `renderContainer` function that generates a <View> with `{flexDirection: "row"}`

Usage:
```
<Radio
  options={ options }
  onSelection={ setSelectedOption }
  renderContainer={Radio.renderHorizontalContainer}
/>
```

**Radio.getViewContainerRenderer(viewCOntainerStyle);**

An helper that generates a simple `<View>` with the provided style.

Usage:
```
<Radio
  options={ options }
  onSelection={ setSelectedOption }
  renderContainer={Radio.getViewContainerRenderer({
    backgroundColor: '#f80046',
    flexDirection: 'row',
    justifyContent: 'space-around',
  })}
/>
```

**Radio.getTextOptionRenderer(normalStyle, selectedStyle, extractText);**

An helper that generates `<Text>` options wrapped in `<TouchableWithoutFeedback>`.
`normalStyle` and `selectedStyle` will be applied to the <Text> nodes, depending on state. `extractText(options)` can be specified.


Usage:
```
const normalStyle = {
  color: 'white'
};

const selectedStyle = {
  color: '#f80046',
  fontWeight: 'bold'
};

const extractText = (option) => option.label;

<Radio
  options={ options }
  onSelection={ setSelectedOption }
  renderOptions={Radio.getTextOptionRenderer(normalStyle, selectedStyle, extractText)}
/>
```
