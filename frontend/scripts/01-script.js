const url = 'http://localhost:3000'

const vendedores = document.querySelector('#listVendedores')
const vendas = document.querySelector('#listVendas')
const formVenda = document.querySelector('.addVenda')

fetch(url + '/vendedores', { method: 'GET' })
    .then(resp => resp.json())
    .then(resp => listarVendedores(resp))
    .catch(err => console.error(err))

function listarVendedores(arr) {
    arr.forEach(e => {
        let row = document.createElement('tr')
        let tdNome = document.createElement('td')
        
        let tdButton = document.createElement('td')
        let btAttVendedor = document.createElement('button')

        btAttVendedor.innerHTML = 'Editar'
        tdNome.innerHTML = e.nome

        tdButton.appendChild(btAttVendedor)

        row.appendChild(tdNome)
        row.appendChild(tdButton)

        vendedores.appendChild(row)
    });
}

fetch(url + '/vendas/view', { method: 'GET' })
    .then(resp => resp.json())
    .then(resp => listarVendas(resp))
    .catch(err => console.error(err))

function listarVendas(arr) {
    arr.forEach(e => {
        let row = document.createElement('tr')
        let tdData = document.createElement('td')
        let tdQuantidade = document.createElement('td')
        let tdVendedor = document.createElement('td')
        let tdProduto = document.createElement('td')
        let tdButton = document.createElement('td')
        let btAttVendas = document.createElement('button')

        btAttVendas.innerHTML = 'Editar'
        tdData.innerHTML = formatDate(e.data)
        tdQuantidade.innerHTML = e.quantidade
        tdVendedor.innerHTML = e.nome_vendedor
        tdProduto.innerHTML = e.nome_produto
        
        tdButton.appendChild(btAttVendas)

        row.appendChild(tdProduto)
        row.appendChild(tdVendedor)
        row.appendChild(tdQuantidade)
        row.appendChild(tdData)
        row.appendChild(tdButton)

        vendas.appendChild(row)

        btAttVendas.addEventListener('click', (e) => {
            e.preventDefault()

            let addFormAtt = document.createElement('form')
            addFormAtt.classList.add('formAttVendas')
            let formAtt = document.querySelector('.formAttVendas')

            let iQuantidade = document.createElement('input')
            iQuantidade.setAttribute('id', 'iQuantidade')

            let iProduto = document.createElement('input')
            iProduto.setAttribute('id', 'iProduto')

            let iVendedor = document.createElement('input')
            iVendedor.setAttribute('id', 'iVendedor')

            let addBtnAtt = document.createElement('button')
            addBtnAtt.type = 'submit'
            addBtnAtt.setAttribute('id', 'btnFormAtt')
            let btnAtt = document.querySelector('#btnFormAtt')

            let table = document.createElement('table')
            let tbody = document.createElement('tbody')

            table.appendChild(table)

            let row = document.createElement('tr')
            let tdQuantidade = document.createElement('td')
            let tdProduto = document.createElement('td')
            let tdVendedor = document.createElement('td')
            let tdButtonAtt = document.createElement('td')

            tdQuantidade.innerHTML = iQuantidade
            tdProduto.innerHTML = iProduto
            tdVendedor.innerHTML = iVendedor
            tdButtonAtt.innerHTML = addBtnAtt

            row.appendChild(tdQuantidade)
            row.appendChild(tdProduto)
            row.appendChild(tdVendedor)
            row.appendChild(tdButtonAtt)

            // formAtt.appendChild(row)
            tbody.appendChild(row)

            btnAtt.addEventListener('submit', (e) => {
                const content = {
                    quantidade: formAtt.iQuantidade.value,
                    produtoID: formAtt.iProduto.value,
                    vendedorID: formAtt.iVendedor.value
                }

                const options = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(content)
                }

                fetch(url + '/vendas/update', options)
                .then(resp => resp.status)
                .then(resp => {
                    if (resp == 202) window.location.reload()
                    else alert('500')
                })
            })
        })
    })
}

function formatDate(data) {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: "short"
    }).format(new Date(data)).replace(",","")
}

formVenda.addEventListener('submit', (e) => {
    e.preventDefault()

    const content = {
        quantidade: formVenda.addQuantidade.value,
        produtoID: formVenda.addProduto.value,
        vendedorID: formVenda.addVendedor.value, 
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    }

    fetch(url + '/vendas/create', options)
    .then(resp => resp.status)
    .then(resp => {
        if (resp == 201) window.location.reload()
        else alert('404')
    })
})