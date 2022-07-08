# Roll20 Character Sheet for Autarch ACKS

This is a Roll20 specific character sheet designed for use with the Adventurer Conqueror King System (ACKS) OSR RGP, published under the OGL license by Autarch.

## Installing

To use this sheet in your own games:

1. In Roll 20, click *Create New Game* and select *Custom* from the *Optional: Choose Character Sheet* drop-down menu.
2. Once the game is created, go to *Settings* > *Game Settings*.
3. Under *Character Sheet Template*...
    1. Within the *HTML Layout* tab, paste in the contents of charactersheet.html.
    2. Within the *CSS Styiling* tab, paste in the contents of charactersheet.css.
    3. Ensure that *Legacy Sanitation* is **NOT** checked.
4. Save your changes and launch the game.

## Roll Templates
### Custom Template

The ACKS sheet leverages a custom roll template. 

The roll template supports the use of graphics in its header. The list of template headers that can be customized can be found at the end of the sheet HTML just before the sheet worker section. Hopefully, the *name* properties are intuitive. 

Use the following syntax to embed banner header graphics:

> \<input type='hidden' name='attr_banner_abilitythrow' value='\[x](BANNER_URL#.png)'/>

If the banners are located in your Roll20 library, you can obtain its *Banner_URL* by dragging it to any Roll20 page, selecting it, and pressing SHFT+Z to display it in the Roll20 image modal view. Then, right click the image and choose *Copy image address*. Replace the *BANNER_URL* with the copied URL.

I recommend that banners be 300px-by-80px and PNG format.

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
