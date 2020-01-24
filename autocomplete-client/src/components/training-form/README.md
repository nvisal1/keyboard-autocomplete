## Training Form

### Description

The Training Form component provides a form with a single text area element.
The component notifies its parent component on form submission with the value of the text area.

### Interface

This component accepts props that abide to the following interface

```
Interface TrainFormProps: {
    handleSubmit: Function // The function that is called on form submission
    handleInput: Function // The function that is called when the content of the form changes.
    text: string // The value to display in the form
}	
```





