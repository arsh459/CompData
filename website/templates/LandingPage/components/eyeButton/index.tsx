import React from "react";

interface Props {
    type: boolean;
}

const EyeButton: React.FC<Props> = ({ type }) => {
    if (type) {
        return (
            <svg
                width="21"
                height="16"
                viewBox="0 0 21 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path
                        d="M16.4784 7.25857C16.817 7.70143 16.817 8.29929 16.4784 8.74143C15.412 10.1336 12.8534 13 9.86629 13C6.87915 13 4.32057 10.1336 3.25415 8.74143C3.08942 8.52938 3 8.26851 3 8C3 7.73149 3.08942 7.47062 3.25415 7.25857C4.32057 5.86643 6.87915 3 9.86629 3C12.8534 3 15.412 5.86643 16.4784 7.25857V7.25857Z"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.86664 10.1429C11.0501 10.1429 12.0095 9.18347 12.0095 8C12.0095 6.81654 11.0501 5.85715 9.86664 5.85715C8.68318 5.85715 7.72379 6.81654 7.72379 8C7.72379 9.18347 8.68318 10.1429 9.86664 10.1429Z"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <path d="M1 12.5L20.5 3.5" stroke="white" />
            </svg>
        );
    }
    return (
        <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path
                    d="M16.4784 7.25857C16.817 7.70143 16.817 8.29929 16.4784 8.74143C15.412 10.1336 12.8534 13 9.86629 13C6.87915 13 4.32057 10.1336 3.25415 8.74143C3.08942 8.52938 3 8.26851 3 8C3 7.73149 3.08942 7.47062 3.25415 7.25857C4.32057 5.86643 6.87915 3 9.86629 3C12.8534 3 15.412 5.86643 16.4784 7.25857V7.25857Z"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9.86664 10.1429C11.0501 10.1429 12.0095 9.18347 12.0095 8C12.0095 6.81654 11.0501 5.85715 9.86664 5.85715C8.68318 5.85715 7.72379 6.81654 7.72379 8C7.72379 9.18347 8.68318 10.1429 9.86664 10.1429Z"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};

export default EyeButton;
