document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video');
    const overlays = document.querySelectorAll('.play-overlay');

    overlays.forEach(overlay => {
        const videoId = overlay.dataset.videoId;
        const video = document.getElementById(videoId);

        // Reproducir o pausar el video al hacer clic en el botón central
        overlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.classList.add('hidden'); // Oculta el botón al reproducir
            } else {
                video.pause();
                overlay.classList.remove('hidden'); // Muestra el botón al pausar
            }
        });

        // Ocultar el botón al reproducir desde otros controles
        video.addEventListener('play', () => {
            overlay.classList.add('hidden');
        });

        // Mostrar el botón al pausar desde otros controles
        video.addEventListener('pause', () => {
            overlay.classList.remove('hidden');
        });
    });

    controls.forEach(control => {
        const videoId = control.dataset.videoId;
        const video = document.getElementById(videoId);
        const seekBar = control.querySelector('.seek-bar');
        const currentTimeDisplay = control.querySelector('.current-time');
        const durationDisplay = control.querySelector('.duration');

        // Actualizar barra de progreso y tiempo actual
        video.addEventListener('timeupdate', () => {
            seekBar.value = (video.currentTime / video.duration) * 100;
            currentTimeDisplay.textContent = formatTime(video.currentTime);
        });

        // Actualizar el video cuando se use la barra de progreso
        seekBar.addEventListener('input', (e) => {
            const seekTime = (e.target.value / 100) * video.duration;
            video.currentTime = seekTime;
        });

        // Establecer la duración del video cuando se cargue
        video.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(video.duration);
        });

        // Función para formatear tiempo
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        };
    });
});



