import React from 'react';
import styled from 'styled-components';

const Container = styled.svg`
    path,
    rect {
        fill: ${props => props.theme.text};  
    }
`;

export default function HomeIcon() {
    return (
        <Container xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 400 400" fill="none">
            <g>
                <path fillRule="evenodd" clipRule="evenodd" d={`
                    M139 121C112.49 121 91 142.49 91 169V294C91 320.51 112.49 342 139
                    342H176V253C176 246.925 180.925 242 187 242H236C242.075 242 247
                    246.925 247 253V342H283C309.51 342 331 320.51 331 294V169C331
                    142.49 309.51 121 283 121H139Z
                `} />
            </g>
            <path d={`
                M202.878 7.46698C207.47 3.2455 214.53 3.24549 219.122 7.46697L371.071 
                147.166C379.121 154.567 373.884 168 362.949 168H59.0511C48.1156
                168 42.8792 154.567 50.9294 147.166L202.878 7.46698Z
            `} />
            <rect x="258" y="5" width="68" height="107" rx="8" />
        </Container>
    )
}