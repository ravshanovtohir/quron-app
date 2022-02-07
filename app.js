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

                function readQuran(index) {
                    wrapper.innerHTML = null
                    let actives = document.querySelectorAll('.active')
                    actives.forEach(el => el.classList.remove('active'))
                    let items = document.querySelectorAll('li')
                    items[index].classList.add('active')
                    items[index].style.color = "green";
                    let audio = document.createElement('audio')
                    let source = document.createElement('source')
                    source.src = surah.data.verses[index].audio.primary
                    audio.append(source)
                    wrapper.append(audio)
                    audio.play()
                    audio.onended = () => {
                        if (index < surah.data.verses.length) {
                            items[index].style.color = 'black'
                            return readQuran(index + 1)
                        }
                    }
                }
                read.onclick = () => {
                    let li = document.querySelectorAll('li')
                    li.forEach(li => {
                        li.style.color = 'black'
                    })
                    readQuran(index)
                }

            }
            request()

            input.value = null


        } catch (error) {
            console.log(error);
        }

    }
})