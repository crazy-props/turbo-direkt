import React from "react";


const TR = (props) => {
    let partsGroup = props.arrayForHeadings[props.myArrayForState.indexOf(props.partInStateArray.group)]

    return (<tr id={`${props.partInStateArray.part}`}
                key={`${props.partInStateArray.part}${props.index}`}
                className="partsTr"
    >
        <td className="partsTd tdName">{partsGroup} {props.partInStateArray.part}</td>
        <td className="partsTd tdSubtract">
            <button
                className={'partsButton'}
                onClick={() => props.subtractAmount(props.partInStateArray.key)}
            >-
            </button>
        </td>
        <td className="partsTd tdAmount">{props.partInStateArray.amount}</td>
        <td className="partsTd tdAdd">
            <button
                className={'partsButton'}
                onClick={() => props.addAmount(props.partInStateArray.key)}
            >+
            </button>
        </td>
        <td className="partsTd tdShoppingCart">
            {props.partInStateArray.isFavorite === true ?
                <button
                    onClick={() => props.remToFavorites(props.partInStateArray)}
                    className={'partsButton partsAddToShoppingListButton'}
                >

                    <svg
                        style={{margin: 'auto'}}
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <title>usuń z ulubionych</title>
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                </button>
                :
                <button
                    className={'partsButton partsAddToShoppingListButton'}
                    onClick={() => props.addToFavorites(props.partInStateArray)}
                >
                    <svg
                        style={{margin: 'auto'}}
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <title>dodaj do ulubionych</title>
                        <path
                            d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                    </svg>
                </button>
            }
        </td>
        <td className="partsTd tdShoppingCart">
            <button
                className={'partsButton partsAddToShoppingListButton'}
                onClick={() => props.addToShoppingList(props.partInStateArray.part, props.partInStateArray.group)}
            >
                <svg id="search-icon" className="search-icon"
                     style={{margin: 'auto'}}
                     height="20"
                     viewBox="0 0 576 512"
                >
                    <title>dodaj do listy zakupów</title>
                    <path
                        d='M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'/>
                </svg>

            </button>
            <button
                className={'partsButton partsAddToShoppingListButton'}
                onClick={() => {
                    props.handleDialogOpen(props.partInStateArray)
                }}
            >
                <svg id="search-icon" className="search-icon"
                     style={{margin: 'auto'}}
                     height="20"
                     viewBox="0 0 24 24"
                >
                    <title>usuń z listy</title>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>

            </button>
        </td>
    </tr>)
}

export default TR