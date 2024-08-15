'use client'
import React, { useState, useRef, useEffect } from 'react'
import './styles.css';

interface ICurso {
    id: number,
    titulo: string,
    preco: number,
    imagem: string
}

interface IshoppingItem {
    produto: ICurso,
    quantidade: number
}

const cursos: ICurso[] = [
    { id: 1, titulo: 'Camisa do Flamengo 2024', preco: 250.00, imagem: 'https://flamengo.vteximg.com.br/arquivos/ids/169036/IP8199_1_APPAREL_Photography_Front-View_white.jpg?v=638416186439730000' },
    { id: 2, titulo: 'Camisa do Real Madrid 24-25', preco: 350.00, imagem: 'https://images.tcdn.com.br/img/img_prod/638286/camisa_real_madrid_2025_uniforme_titular_torcedor_aeroready_11032_1_d718693f3d49c7b99d1e9e7cfaee9cf8.png' },
    { id: 3, titulo: 'Camisa do Manchester United 07-08', preco: 320.00, imagem: 'https://acdn.mitiendanube.com/stores/002/709/427/products/2081-0439cb570c7727db9616735437239139-640-0.png' },
    { id: 4, titulo: 'Camisa da Seleção Brasileira', preco: 190.00, imagem: 'https://acdn.mitiendanube.com/stores/002/341/698/products/camisa-titular-selecao-brasileira-nike-2024-2025-amarelo-verde-azul-1-6d7ef706ec05a2ae0017110655127877-1024-1024.png' },
    { id: 5, titulo: 'Camisa do Barcelona 08-09', preco: 290.00, imagem: 'https://www.vintagefootballshirts.com/uploads/products/images/2008-09-barcelona-home-shirt-32042-1.jpg' },
    { id: 6, titulo: 'Camisa do Santos 2012', preco: 290.00, imagem: 'https://acdn.mitiendanube.com/stores/002/523/902/products/ep493vopohfz2an1-e3a93153de893dc28216307038620577-640-0.jpg' },
    { id: 7, titulo: 'Camisa do Corinthians 2024', preco: 250.00, imagem: 'https://www.lojasportfanatics.com.br/cdn/shop/files/Corinthians-branca-patrocinio_800x.png?v=1717678842' },
    { id: 16, titulo: 'Camisa do São Paulo 2024', preco: 250.00, imagem: 'https://static.saostore.com.br/produtos/camisa-sao-paulo-i-2425-sn-jogador-new-balance-masculina/24/39U-9323-024/39U-9323-024_zoom1.jpg?ts=1705669959?ims=400x' },
    { id: 8, titulo: 'Camisa do Palmeiras 2024', preco: 250.00, imagem: 'https://lojapalmeiras.vteximg.com.br/arquivos/ids/181243-1000-1000/_0067_777230_01.jpg?v=638418776040430000' },
    { id: 9, titulo: 'Camisa do Chelsea 24-25', preco: 300.00, imagem: 'https://dasports.com.br/cdn/shop/files/Camisa-titular-do-Chelsea-FC-2024-2025-e-lancada-pela-Nike-7-585x585_500x.png?v=1721355632' },
    { id: 10, titulo: 'Camisa do Milan 24-25', preco: 300.00, imagem: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/774949/01/fnd/PNA/fmt/png/AC-Milan-24/25-Men's-Authentic-Home-Soccer-Jersey" },
    { id: 11, titulo: 'Camisa do PSG 24-25', preco: 300.00, imagem: 'https://dcdn.mitiendanube.com/stores/003/589/195/products/psg-paris-saint-germain-camisa-nova-nike-24-25-2024-2025-titular-home-casa-1-i-mbappe-neymar-rai-ronaldinho-gaucho-qatar-messi-leblues-3-1d27c6a712f16aac7417160775318084-1024-1024.png' },
    { id: 12, titulo: 'Camisa da Juventus 24-25', preco: 300.00, imagem: 'https://acdn.mitiendanube.com/stores/001/409/577/products/camisa-titular-juventus-24-25-home-adidas-preto-e-branco-masculino-torcedor-futebol-authentic-oficial-velha-senhora-calcio-seriaa-champions-league-793abc9e814fd543c917211435409482-640-0.png' },
    { id: 13, titulo: 'Camisa do Liverpool 24-25', preco: 300.00, imagem: 'https://dcdn.mitiendanube.com/stores/003/589/195/products/liverpool-nova-camisa-nike-24-25-2024-2025-titular-casa-home-principal-1-i-vermelha-jurgen-klopp-salah-reds-champions-ucl-5-6bf4e331e6d9bc64f717160769301704-1024-1024.png' },
    { id: 14, titulo: 'Camisa do Bayern de Munique 24-25', preco: 300.00, imagem: 'https://acdn.mitiendanube.com/stores/002/935/203/products/camisa-bayern-de-minichen-munique-24-25-vermelho-2-05582cf52a857a049617194323223466-1024-1024.png' },
    { id: 15, titulo: 'Camisa do Manchester City 24-25', preco: 300.00, imagem: 'https://img-br.prvstatic.com/front/get/photo/241613_-_images_-_products_-_770437-01_AZUL_-_templ1.jpg' },
    { id: 17, titulo: 'Camisa do Arsenal 2024', preco: 300.00, imagem: 'https://acdn.mitiendanube.com/stores/001/409/577/products/camisa-titular-arsenal-home-24-25-adidas-vermelha-masculina-torcedor-premier-league-champions-league-gunners-arteta-odergard-martinelli-70d37564e7ef5e5c5817158035278363-640-0.png' },
    { id: 18, titulo: 'Camisa do Al Nassr 24-25', preco: 300.00, imagem: 'https://acdn.mitiendanube.com/stores/001/409/577/products/camisa-titular-al-nassr-home-i-24-25-adidas-amarelo-masculino-torcedor-futebol-oficial-authentic-cr7-sane-liga-saudita-64075b72da1b74de6517224562244694-480-0.png' },
    { id: 19, titulo: 'Camisa do Inter Miami 2024', preco: 300.00, imagem: 'https://acdn.mitiendanube.com/stores/001/620/789/products/48-446132c57e103ba6fc17103002595432-640-0.png' },
    { id: 20, titulo: 'Camisa do Borussia Dortmund 24-25', preco: 300.00, imagem: 'https://acdn.mitiendanube.com/stores/002/341/698/products/camisa-titular-borussia-dortmund-2024-25-puma-1-00106a76dfd4e7a5e417159545157510-480-0.png' },
    
    
]

const MarketCarPages = () => {
    const [shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')

    const cartRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef<boolean>(false)
    const startY = useRef<number>(0)
    const initialY = useRef<number>(0)

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (cartRef.current && cartRef.current.contains(e.target as Node)) {
                isDragging.current = true
                startY.current = e.clientY
                const currentTransform = getComputedStyle(cartRef.current).transform
                if (currentTransform !== 'none') {
                    const matrix = new DOMMatrix(currentTransform)
                    initialY.current = matrix.m42 // valor da translação Y atual
                } else {
                    initialY.current = 0
                }
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current && cartRef.current) {
                const diffY = e.clientY - startY.current
                const newY = initialY.current + diffY
                cartRef.current.style.transform = `translateY(${newY}px)`
            }
        }

        const handleMouseUp = () => {
            isDragging.current = false
        }

        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    const handleAddCurso = (id: number) => {
        const curso = cursos.find((curso) => curso.id === id)
        const cursoExistenteShopping = shoppingCurso.find(item => item.produto.id === id)

        if (cursoExistenteShopping) {
            const newShoppingCurso: IshoppingItem[] = shoppingCurso.map(item => {
                if (item.produto.id === id) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                }
                return item
            })
            setShoppingCurso(newShoppingCurso)
            return
        }

        const carItem: IshoppingItem = {
            produto: curso!,
            quantidade: 1
        }
        const newShoppingCurso: IshoppingItem[] = [...shoppingCurso, carItem]
        setShoppingCurso(newShoppingCurso)
    }

    const handleRemoveCurso = (id: number) => {
        const newShoppingCurso = shoppingCurso
            .map(item => {
                if (item.produto.id === id) {
                    return {
                        ...item,
                        quantidade: item.quantidade - 1
                    }
                }
                return item
            })
            .filter(item => item.quantidade > 0)

        setShoppingCurso(newShoppingCurso)
    }

    const calculateTotal = () => {
        return shoppingCurso.reduce((total, item) => total + item.produto.preco * item.quantidade, 0).toFixed(2)
    }

    const printShoppingCart = () => {
        const printContent = shoppingCurso
            .map(item => (
                `<p>Título: ${item.produto.titulo} | Preço: ${item.produto.preco} | Quantidade: ${item.quantidade} | Total: ${item.produto.preco * item.quantidade}</p>`
            ))
            .join('')

        const printWindow = window.open('', '', 'height=600,width=800')
        if (printWindow) {
            printWindow.document.write('<html><head><title>Carrinho de Compras</title></head><body>')
            printWindow.document.write('<h1>Carrinho de Compras</h1>')
            printWindow.document.write(printContent)
            printWindow.document.write(`<h2>Valor Total: ${calculateTotal()}</h2>`)
            printWindow.document.write('</body></html>')
            printWindow.document.close()
            printWindow.focus()
            printWindow.print()
        }
    }

    const filteredCursos = cursos.filter(curso =>
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container">
            <header className="header">
                <h1 className="header-title">Peak Performance</h1>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Pesquisar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>

            <main className="main">
                <h2 className="main-title">Produtos à venda</h2>
                <div className="courses-list">
                    <ul className="courses-ul">
                        {filteredCursos.map(curso => (
                            <li key={curso.id} className="course-item"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <img src={curso.imagem} alt={curso.titulo} className="course-image" />
                                <div className="course-info">
                                    <p className="course-title">{curso.titulo}</p>
                                    <p className="course-price">Preço: R$ {curso.preco.toFixed(2)}</p>
                                </div>
                                <button className="add-button" onClick={() => handleAddCurso(curso.id)}>Adicionar ao Carrinho</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            <div
                className={`cart ${isCartOpen ? 'open' : ''}`}
                ref={cartRef}
                style={{ cursor: 'grab' }}
            >
                <h1 className="cart-title">Carrinho de Compras</h1>
                <ul className="cart-items">
                    {shoppingCurso.map((item) => (
                        <li key={item.produto.id} className="cart-item">
                            <p className="cart-item-title">Título: {item.produto.titulo}</p>
                            <p className="cart-item-price">Preço: R$ {item.produto.preco.toFixed(2)}</p>
                            <p className="cart-item-quantity">Quantidade: {item.quantidade}</p>
                            <p className="cart-item-total">Total: R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
                            <button className="remove-button" onClick={() => handleRemoveCurso(item.produto.id)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <h2 className="cart-total">Valor Total: R$ {calculateTotal()}</h2>
                <button className="print-button" onClick={printShoppingCart}>Imprimir Carrinho</button>
            </div>

            <button className="cart-toggle" onClick={() => setIsCartOpen(!isCartOpen)}>
                <span className="cart-toggle-icon">🛒</span>
            </button>
        </div>
    )
}

export default MarketCarPages
