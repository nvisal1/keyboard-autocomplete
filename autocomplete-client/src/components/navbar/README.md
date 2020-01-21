## Navbar

### Description

The Navbar component provides an interface for displaying
and selecting options within the application. Navbar is a
functional component and does not keep track of the
application's current option.

### Interface

This component accepts props that abide to the following interface

```
Interface NavbarProps: {
    options: string[] // A list of options to display
	selectedOption: string // The application's current mode
	handleClick: Function // The function that is called on onClick (for selecting an option)
}	
```

### Child Components

#### Option

README at ./components/option/README.md




