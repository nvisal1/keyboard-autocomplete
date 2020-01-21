## Input

### Description

The Input component provides a styled input element. The
component notifies its parent when the onChange event is
fired. Input is a functional component and does not
store the value of the input text.

### Interface

This component accepts props that abide to the following interface

```
Interface InputProps: {
	handleInput: Function // This function that is called on onChange
	text: string // The value to display in the input element
}	
```
