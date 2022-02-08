let res = document.querySelector("#res")
let button = document.querySelector("#read")
let header = document.querySelector("#heder")
let input = document.querySelector("#search")
let numOfAyats = document.querySelector("#num")
let wrapper = document.querySelector("#wrapper")


input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        try {
            async function request() {
                res.innerHTML = null

                let response = await fetch(`https://api.quran.sutanlab.id/surah/${+input.value}`)
                let surah = await response.json()

                console.log(surah);

                numOfAyats.textContent = surah.data.numberOfVerses
                header.textContent = surah.data.name.transliteration.en


                for (let i = 0; i < surah.data.verses.length; i++) {


                    let li = document.createElement("li")
                    li.textContent = surah.data.verses[i].text.arab

                    let audio = document.createElement("audio")
                    audio.controls = false

                    let source = document.createElement("source")
                    source.src = surah.data.verses[i].audio.primary

                    audio.append(source)

                    res.append(li)

                    li.onclick = () => {
                        wrapper.innerHTML = null
                        wrapper.append(audio)
                        audio.play()
                    }

                }

                let index = 0

                button.addEventListener("click", () => {
                    let index = 0
                    wrapper.innerHTML = null
                    let audioEl = document.createElement("audio")
                    let audio = surah.data.verses[index++].audio.primary
                    audioEl.src = audio
                    wrapper.append(audioEl)
                    audioEl.play()

                    audioEl.onended = () => {
                        if (index >= surah.data.verses.length) return
                        audioEl.src = surah.data.verses[index++].audio.primary
                        audioEl.play()
                    }
                })

            }
            request()

            input.value = null


        } catch (error) {
            console.log(error);
        }

    }
})