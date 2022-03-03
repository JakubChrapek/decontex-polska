import React, { useRef } from 'react'
import { StructuredText } from 'react-datocms'
import styled from 'styled-components'
import { motion } from "framer-motion";

const Benefits = ({ data }) => {
    const constraintsRef = useRef(null);

    return (
      <Wrapper>
        <Container className="container">
          <StructuredText data={data.title} />
          <Grid ref={constraintsRef}>
            <motion.ul drag="x" dragConstraints={constraintsRef}>
              {data.benefits.map((el) => (
                <motion.li>
                  <img src={el.icon.url} alt={el.icon.alt} title={el.icon.title} />
                  <StructuredText data={el.title} />
                  <p>{el.text}</p>
                </motion.li>
              ))}
            </motion.ul>
          </Grid>
        </Container>
      </Wrapper>
    );
}

export default Benefits

const Wrapper = styled.section`
    padding: 96px 0;
    background-color: var(--backgroundGrey);

`

const Container = styled.div`

    h2{
        margin-bottom: 40px;
        font-size: 36px;
        line-height: 110%;
        letter-spacing: 0px;
    }

    @media (max-width: 480px) {
        font-size: 32px;
    }

`

const Grid = styled.div`
    ul{
        width: fit-content;
        display: grid;
        grid-template-columns: repeat(4, 269.5px);
        grid-column-gap: 24px;

        li{
            background-color: #fff;
            box-shadow: 0px 20px 50px rgba(18, 17, 39, 0.08);
            border-radius: 12px;
            padding: 56px 24px 85px 24px;
            
            img{

            }

            h3{
                padding: 26px 0 16px ;
                font-weight: bold;
                font-size: 18px;
                line-height: 130%;
                color: var(--superDarkText);
            }

            p{
                font-size: 14px;
                line-height: 180%;
                
            }
        }
    }
`