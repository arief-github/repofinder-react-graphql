import React from 'react'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'

export default function PageNavigation({ start, end, next, previous, onPage }) {
    return (
        <div className="d-flex justify-content-center my-2">
            {previous && (
                <button
                    className="btn mx-1 btn-sm btn-primary"
                    onClick={() => onPage("last", 'before: "' + start + '"')}> <BiArrowToLeft/> </button>
            )}
            {next && (
                <button
                    className="btn mx-1 btn-sm btn-primary bi bi-arrow-right"
                    onClick={() => onPage("first", 'after: "' + end + '"')}> <BiArrowToRight/> </button>
            )}
        </div>
    )
}
