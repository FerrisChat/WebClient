import React from 'react';
import styled from 'styled-components';

import type { SanitizedThemeTemplate } from '../../core/theming/Theme';

const Container = styled.svg<{ t: SanitizedThemeTemplate }>`
    #tp__preview_tertiary rect {
        fill: ${({ t }) => t.tertiary}
    }

    #tp__preview_text rect {
        fill: ${({ t }) => t.text}
    }
`;

export default function ThemePreviewer({ theme }: { theme: SanitizedThemeTemplate }) {
    return (
        <Container t={theme} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 540" fill="none">
            <g>
                <rect width="900" height="540" rx="50" fill={theme.secondary} />
                <g id="tp__preview_tertiary">
                    <rect width="207" height="540" rx="50" />
                    <rect x="752" width="148" height="540" rx="50" />
                    <rect x="65" width="159" height="540" />
                    <rect x="695" width="158" height="540" />
                    <rect x="224" y="480" width="528" height="60" />
                </g>
                <g>
                    <circle cx="40" cy="99" r="20" fill="#70E248" />
                    <circle cx="40" cy="47" r="20" fill="#FF8282" />
                    <circle cx="40" cy="254" r="20" fill="#C4C4C4" />
                    <ellipse cx="40" cy="305.5" rx="20" ry="19.5" fill="#9086FF" />
                    <circle cx="40" cy="357" r="20" fill="#761E1E" />
                    <circle cx="40" cy="409" r="20" />
                    <ellipse cx="40" cy="150.5" rx="20" ry="19.5" fill="#C172FF" />
                    <circle cx="40" cy="202" r="20" fill="#9BF3FF" />
                    <circle cx="262" cy="439" r="20" fill="#9BF3FF" />
                    <circle cx="262" cy="316" r="20" fill="#9BF3FF" />
                    <circle cx="740" cy="48" r="20" fill="#9BF3FF" />
                    <circle cx="740" cy="178" r="20" fill="#9BB7FF" />
                    <circle cx="262" cy="377" r="20" fill="#50C771" />
                    <circle cx="740" cy="117" r="20" fill="#50C771" />
                    <circle cx="97" cy="510" r="20" fill="#9BB7FF" />
                </g>
                <rect x="405" y="381" width="113" height="16" rx="8" fill={theme.link} />
                <g id="tp__preview_text">
                    <rect x="88" y="27" width="114" height="23" rx="11.5" />
                    <rect x="77" y="90" width="89" height="18" rx="9" fill-opacity="0.8" />
                    <rect x="77" y="122" width="47" height="19" rx="9.5" fill-opacity="0.8" />
                    <rect x="133" y="122" width="58" height="19" rx="9.5" fill-opacity="0.8" />
                    <rect x="77" y="157" width="89" height="18" rx="9" />
                    <rect x="77" y="189" width="68" height="19" rx="9.5" fill-opacity="0.8" />
                    <rect x="293" y="422" width="100" height="15" rx="7.5" />
                    <rect x="293" y="443" width="63" height="16" rx="8" />
                    <rect x="362" y="443" width="45" height="16" rx="8" />
                    <rect x="413" y="443" width="105" height="16" rx="8" />
                    <rect x="398" y="422" width="69" height="15" rx="7.5" fill-opacity="0.5" />
                    <rect x="293" y="299" width="100" height="15" rx="7.5" />
                    <rect x="773" y="30" width="79" height="18" rx="9" />
                    <rect x="774" y="56" width="86" height="14" rx="7" fill-opacity="0.6" />
                    <rect x="124" y="490" width="88" height="18" rx="9" />
                    <rect x="125" y="516" width="47" height="14" rx="7" fill-opacity="0.6" />
                    <rect x="767" y="158" width="88" height="18" rx="9" />
                    <rect x="768" y="184" width="47" height="14" rx="7" fill-opacity="0.6" />
                    <rect x="774" y="124" width="86" height="14" rx="7" fill-opacity="0.6" />
                    <rect x="293" y="320" width="39" height="16" rx="8" />
                    <rect x="339" y="320" width="66" height="16" rx="8" />
                    <rect x="412" y="320" width="19" height="16" rx="8" />
                    <rect x="437" y="320" width="209" height="16" rx="8" />
                    <rect x="398" y="299" width="69" height="15" rx="7.5" fill-opacity="0.5" />
                    <rect x="293" y="360" width="25" height="15" rx="7.5" />
                    <rect x="323" y="360" width="92" height="15" rx="7.5" />
                    <rect x="773" y="99" width="25" height="18" rx="9" />
                    <rect x="803" y="99" width="66" height="18" rx="9" />
                    <rect x="293" y="381" width="63" height="16" rx="8" />
                    <rect x="362" y="381" width="36" height="16" rx="8" />
                    <rect x="525" y="381" width="41" height="16" rx="8" />
                    <rect x="422" y="360" width="69" height="15" rx="7.5" fill-opacity="0.5" />
                    <rect x="242" y="498" width="271" height="23" rx="11.5" />
                </g>
                <rect x="744" y="55" width="16" height="16" rx="8" fill="#57E877" stroke={theme.secondary} stroke-width="4" />
                <rect x="744" y="121" width="16" height="16" rx="8" fill="#57E877" stroke={theme.secondary} stroke-width="4" />
                <rect x="744" y="184" width="16" height="16" rx="8" fill="#57E877" stroke={theme.secondary} stroke-width="4" />
                <rect x="103" y="515" width="16" height="16" rx="8" fill="#57E877" stroke={theme.secondary} stroke-width="4" />
            </g>
        </Container>
    )
}