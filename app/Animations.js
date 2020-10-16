/**
 *
 * animation_FadeIn
 *
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos:
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 *
 *
 */
const animation_FadeIn = (getTo) => {
    console.log("DEBUG: Animación Fade in");
    // Selecciona elementos a animar
    const el = GAME_UI.app.querySelector(getTo);
    const title = el.querySelector("h1");

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(el, {
        visibility: "visible",
        opacity: 0,
    });
    anime.set(title, {
        opacity: 0,
        translateY: 50,
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 500,
        easing: "easeInOutSine",
    });

    animation_layout
        .add({
            targets: [el],
            opacity: 1,
        })
        .add(
            {
                targets: [title],
                opacity: 1,
                translateY: 0,
            },
            "-=200"
        );
};

/**
 * El resto de animaciones las construyes tú.
 * Recuerda que puedes guardar las animaciones del layout
 * en la variable global animation
 */
const animation_SplashToMenu = (getTo) => {
    console.log("DEBUG: Animación Splash menu");
    // Selecciona elementos a animar
    const from = GAME_UI.app.querySelector(GAME_UI.state.navigationStage);
    const to = GAME_UI.app.querySelector(getTo);

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, {
        visibility: "visible",
        translateY: "100%",
        opacity: 0,
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: "easeInOutSine",
    });
    animation_layout
        .add({
            targets: [from],
            translateY: "-100%",
            opacity: 0,
        })
        .add(
            {
                targets: [to],
                translateY: 0,
                opacity: 1,
            },
            "-=750"
        );
};

const animation_MenuToGame = (getTo) => {
    console.log("DEBUG: Animación para ir del menu al juego");
    const from = GAME_UI.app.querySelector(GAME_UI.state.navigationStage);
    const to = GAME_UI.app.querySelector(getTo);

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, {
        visibility: "visible",
        translateY: "100%",
        opacity: 0,
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: "easeInOutSine",
    });
    animation_layout
        .add({
            targets: [from],
            translateY: "-100%",
            opacity: 0,
        })
        .add(
            {
                targets: [to],
                translateY: 0,
                opacity: 1,
            }
        );
};

const animation_GameOut = (getTo) => {
    animation_PopupModalOut();
    GAME_UI.state.navigationStage = "#modal_pause_window";
    animation_PopupResume();
    GAME_UI.state.navigationStage = "#main_page";
    animation_SplashToMenu(getTo);

    document.getElementById('game').innerHTML = '';
};

/**
 *
 * Ejemplo de un popup, como vemos, es lo mismo....
 */
const animation_PopupPause = (getTo) => {
    console.log("DEBUG: Animación para pausar el juego");
    const popup = GAME_UI.app.querySelector(getTo);
    const game = GAME_UI.app.querySelector('#main_page');


    anime.set(popup, {
        translateY: "20%",
        opacity: 0,
        visibility: "visible",
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: "easeOutQuad",
    });

    animation_layout.add({
        targets: game,
        opacity: 0.1
    })
    .add({
        targets: popup,
        translateY: "0%",
        opacity: 1,
    });
};

const animation_PopupResume = () => {
    console.log("DEBUG: Animación volver al juego por Resume");

    const popup_out = GAME_UI.app.querySelector(GAME_UI.state.navigationStage);
    const game = GAME_UI.app.querySelector('#main_page');


    animation_layout = anime.timeline({
        duration: 750,
        easing: "easeOutQuad",
    });

    animation_layout.add({
        targets: popup_out,
        translateY: "100%",
        visibility: "hidden",
        opacity: 0,
    })
    .add({
        targets: game,
        opacity: 1,
    });
};

const animation_PopupModalIn = (getTo) => {
    console.log("DEBUG: Animación entra la ventana de confirm");
    const popup = GAME_UI.app.querySelector(getTo);

    anime.set(popup, {
        translateY: "20%",
        opacity: 0,
        visibility: "visible",
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: "easeOutQuad",
    });

    animation_layout.add({
        targets: popup,
        translateY: "0%",
        opacity: 1,
    });
};

const animation_PopupModalOut = () => {
    console.log(
        'DEBUG: Animación retirar "popUp confirmación" al no salir del juego'
    );

    const popup = GAME_UI.app.querySelector(GAME_UI.state.navigationStage);

    anime.set(popup, {
        translateY: "20%",
        opacity: 1,
        visibility: "visible",
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: "easeOutQuad",
    });

    animation_layout.add({
        targets: popup,
        translateY: "100%",
        visibility: "hidden",
        opacity: 0,
    });
};
