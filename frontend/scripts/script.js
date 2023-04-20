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
        tdVendedor.innerHTML = e.vendedor
        tdProduto.innerHTML = e.produto

        tdButton.appendChild(btAttVendas)

        row.appendChild(tdProduto)
        row.appendChild(tdVendedor)
        row.appendChild(tdQuantidade)
        row.appendChild(tdData)
        row.appendChild(tdButton)

        vendas.appendChild(row)

        btAttVendas.setAttribute('onclick', `attVendas('${e.id}')`)
    })
}

const formAttVendas = document.querySelector('.altVendas')

function attVendas(i) {
    let iQuantidade = document.createElement('input')
    iQuantidade.placeholder = 'Quantidade'
    iQuantidade.type = 'number'
    iQuantidade.setAttribute('id', 'iQuantidade')
    
    let iProduto = document.createElement('input')
    iProduto.placeholder = 'ID do Produto'
    iProduto.type = 'number'
    iProduto.setAttribute('id', 'iProduto')
    
    let iVendedor = document.createElement('input')
    iVendedor.placeholder = 'ID do Vendedor'
    iVendedor.type = 'number'
    iQuantidade.setAttribute('id', 'iVendedor')

    let btnAttVendas = document.createElement('button')
    btnAttVendas.type = 'submit'
    btnAttVendas.textContent = 'Alterar'
    btnAttVendas.setAttribute('id', 'btnAttVendas')

    formAttVendas.appendChild(iQuantidade)
    formAttVendas.appendChild(iProduto)
    formAttVendas.appendChild(iVendedor)
    formAttVendas.appendChild(btnAttVendas)

    formAttVendas.addEventListener('submit', (e) => {
        e.preventDefault()

        const content = {
            quantidade: formAttVendas.iQuantidade.value,
            produtoID: formAttVendas.iProduto.value,
            vendedorID: formAttVendas.iVendedor.value
        }
    
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        }
    
        fetch(url + '/vendas/update', options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 201) window.location.reload()
                else alert('404')
            })
    })

}

function formatDate(data) {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: "short"
    }).format(new Date(data)).replace(",", "")
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