/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { CustomVizProps, CustomVizStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<CustomVizStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light1};
  padding: ${({ theme }) => theme.tdUnit * 4}px;
  border-radius: ${({ theme }) => theme.tdUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.tdUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  table {
    width: 100%;
    table-layout: fixed;
  }

  td {
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.secondary.light2};
    text-align: center;
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.tdUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
`;

const BigValueContainer = styled.div`
  font-size: 40px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary.light4};
  border-top: solid;
  border-left: solid;
  border-right: solid;
  border-color: ${({ theme }) => theme.colors.secondary.light2};
`;

const ValueContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary.light4};
  font-size: 20px;
  //border-style: solid;
  //border-color: ${({ theme }) => theme.colors.secondary.light2};
  text-align: center;
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */
const PROPORTION = {
  // text size: proportion of the chart container sans trendline
  KICKER: 0.1,
  HEADER: 0.3,
  SUBHEADER: 0.125,
  // trendline size: proportion of the whole chart container
  TRENDLINE: 0.3,
};


export default function PopKPI(props: CustomVizProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const {
    data,
    height,
    width,
    metrics,
    metricName,
    bigNumber,
    prevNumber,
    valueDifference,
    percentDifference,
    compType
  } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
  });

  // We grab the ones that are index as one.
  // All other metrics are ignored

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <BigValueContainer>{bigNumber}</BigValueContainer>
      <table>
        <tr>
          <td>
            <ValueContainer>Prev: {prevNumber}</ValueContainer>
          </td>
          <td>
            <ValueContainer>Δ: {valueDifference}</ValueContainer>
          </td>
          <td>
            <ValueContainer>%Δ: {percentDifference}</ValueContainer>
          </td>
        </tr>
      </table>
      <div>{props.headerText}</div>
      <h4>{metricName}</h4>
      <h4>
        This {compType}: {bigNumber}
      </h4>
      <h4>
        Last {compType}: {prevNumber}
      </h4>
      <h4>Value Difference {valueDifference}</h4>
      <h4>Percent Difference: {percentDifference}</h4>
    </Styles>
  );
}
