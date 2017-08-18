const reset = (function() {
    const Container = row => {
        const element = document.createElement('div')
        element.setAttribute('class', 'container')
        row.appendChild(element)
        return element
    }
    const Row = (num, main) => {
        const element = document.createElement('div')
        element.setAttribute('class', 'row')
        element.setAttribute('type', num % 2 ? 'even' : 'odd')
        main.appendChild(element)
        return element
    }
    const clearPage = (root, rows) => {
        while (document.body.children.length) {
            document.body.removeChild(document.body.children[0])
        }
        const main = document.createElement('div')
        main.setAttribute('class', 'main')
        let width = 30 * root.length + 30
        let height = 30 * (rows || root.length)
        let style = `width: ${width}; height: ${height};`
        main.setAttribute('style', style)
        document.body.appendChild(main)
        return main
    }
    const reset = (root = [0,0,0,0,1,0,0,0,0], rows = undefined) => {
        const main = clearPage(root, rows)
        const Rows = new Array
        for (let i = 0; i < (rows || root.length); i++) {
            Rows.push(Row(i, main))
            for (let j = 0; j < root.length + i % 2; j++) {
                Container(Rows[i])
            }
        }
        Array.from(Rows[0].children).forEach((container, index) => {
            container.innerHTML = root[index]
        })
        for (let i = 1; i < Rows.length; i++) {
            for (let j = 0; j < Rows[i].childElementCount; j++) {
                let a = 0, b = 0
                switch (i % 2) {
                    case 0:
                        a = Number(Rows[i - 1].children[j].innerHTML)
                        b = Number(Rows[i - 1].children[j + 1].innerHTML)                
                        break
                    case 1:
                        if (j == 0) {
                            b = Number(Rows[i - 1].children[j].innerHTML)
                        } else if (j == Rows[i].childElementCount - 1) {
                            a = Number(Rows[i - 1].children[j - 1].innerHTML)
                        } else {
                            a = Number(Rows[i - 1].children[j - 1].innerHTML)
                            b = Number(Rows[i - 1].children[j].innerHTML)
                        }
                }
                Rows[i].children[j].innerHTML = a + b
            }
        }
        Rows.forEach(row => {
            Array.from(row.children).forEach((container) => {
                if (container.innerHTML == '0') {
                    container.setAttribute('type', 'zero')
                    container.innerHTML = ''
                }
            })
        })
    }
    window.onload = () => reset()
    return reset
})()