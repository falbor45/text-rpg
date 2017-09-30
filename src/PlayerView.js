import React, { Component } from 'react'
import { Col, ProgressBar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'
import blockFront1 from './assets/images/blockfront1.png'
import blockFront2 from './assets/images/blockfront2.png'
import blockFront3 from './assets/images/blockfront3.png'
import blockLeft1 from './assets/images/blockleft1.png'
import blockLeft2 from './assets/images/blockleft2.png'
import blockLeft3 from './assets/images/blockleft3.png'
import blockRight1 from './assets/images/blockright1.png'
import blockRight2 from './assets/images/blockright2.png'
import blockRight3 from './assets/images/blockright3.png'
import blockPlaceholder from './assets/images/blockplaceholder.png'

export default connect (
    state => ({
      playerStats: state.playerStats,
      blockMechanic: state.blockMechanic,
      abilities: state.abilities
    }),
    dispatch => ({
      blockMechanicChangeLeftBlock: (what) => dispatch({ type: 'blockMechanic/CHANGE_LEFT_BLOCK', what}),
      blockMechanicChangeFrontBlock: (what) => dispatch({ type: 'blockMechanic/CHANGE_FRONT_BLOCK', what}),
      blockMechanicChangeRightBlock: (what) => dispatch({ type: 'blockMechanic/CHANGE_RIGHT_BLOCK', what}),
      playerStatsGainStrength: value => dispatch({ type: 'playerStats/GAIN_STRENGTH', value}),
      playerStatsGainWisdom: value => dispatch({ type: 'playerStats/GAIN_WISDOM', value}),
      playerStatsGainAgility: value => dispatch({ type: 'playerStats/GAIN_AGILITY', value}),
      playerStatsGainConstitution: value => dispatch({ type: 'playerStats/GAIN_CONSTITUTION', value}),
      playerStatsGainStatPoint: value => dispatch({ type: 'playerStats/GAIN_STAT_POINT', value})
    })
)(
    class PlayerView extends Component {

      handleLeftBlockClick = (e) => {
        if (e.nativeEvent.which === 1) {
          this.props.blockMechanicChangeLeftBlock('add')
        }
        if (e.nativeEvent.which === 3) {
          this.props.blockMechanicChangeLeftBlock('substract')
        }
      }

      handleFrontBlockClick = (e) => {
        if (e.nativeEvent.which === 1) {
          this.props.blockMechanicChangeFrontBlock('add')
        }
        if (e.nativeEvent.which === 3) {
          this.props.blockMechanicChangeFrontBlock('substract')
        }
      }

      handleRightBlockClick = (e) => {
        if (e.nativeEvent.which === 1 ) {
          this.props.blockMechanicChangeRightBlock('add')
        }
        if (e.nativeEvent.which === 3) {
          this.props.blockMechanicChangeRightBlock('substract')
        }
      }

      handleStatDistribution = (attr) => {
        if (attr === 'str') {
          this.props.playerStatsGainStrength(1)
        }
        if (attr === 'agi') {
          this.props.playerStatsGainAgility(1)
        }
        if (attr === 'wis') {
          this.props.playerStatsGainWisdom(1)
        }
        if (attr === 'cons') {
          this.props.playerStatsGainConstitution(1)
        }
        this.props.playerStatsGainStatPoint(-1)
      }

      state = {
        viewedTab: 'attributes'
      }

      addPoint = {
        cursor: 'pointer',
        border: '1px solid black',
        borderRadius: '50%',
        padding: '0 6px 0 6px'
      }

      imageBlockStyle = {
        width: '33.3%'
      }

      centerBarText = {
        position: 'absolute',
        left: '50%'
      }

      barOverlap = {
        position: 'relative',
        left: '-50%'
      }

      eqElStyle = {
        height: '32px',
        display: 'flex',
        justifyContent: 'space-around',
        margin: '8px 0'
      }

      createEqTooltip = (equipment) => (
        <Tooltip id="tooltipEq" style={{textAlign: "center"}}>
          <div style={{color: "#d3d3d3"}}>
            {this.props.playerStats[equipment].name}
          </div>
          <div>
            {this.props.playerStats[equipment].attackPowerMin !== 0 ? `+${this.props.playerStats[equipment].attackPowerMin} to minimum attack damage` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].attackPowerMax !== 0 ? `+${this.props.playerStats[equipment].attackPowerMax} to maximum attack damage` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].magicDamage !== 0 ? `+${this.props.playerStats[equipment].magicDamage} to magic damage` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].armour !== 0 ? `+${this.props.playerStats[equipment].armour} to armour` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].speed !== 0 ? `+${this.props.playerStats[equipment].speed} to speed` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].maxHealthBonus !== 0 ? `+${this.props.playerStats[equipment].maxHealthBonus} to maximum health` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].maxEnergyBonus !== 0 ? `+${this.props.playerStats[equipment].maxEnergyBonus} to maximum energy` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].strength !== 0 ? `+${this.props.playerStats[equipment].strength} to strength` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].wisdom !== 0 ? `+${this.props.playerStats[equipment].wisdom} to wisdom` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].agility !== 0 ? `+${this.props.playerStats[equipment].agility} to agility` : null}
          </div>
          <div>
            {this.props.playerStats[equipment].constitution !== 0 ? `+${this.props.playerStats[equipment].constitution} to constitution` : null}
          </div>
        </Tooltip>
      )

      render() {
        for (let i = 0; i < document.getElementsByTagName('img').length; i++) {
          document.getElementsByTagName('img')[i].oncontextmenu = () => {
            return false
          }
        }
        return (
            <Col style={{textAlign: 'center'}} lg={3}>
              <h1>{this.props.playerStats.pName}</h1>
              <h4>Level: {this.props.playerStats.pLevel}</h4>
              <h2>Health</h2>
              <div style={this.centerBarText}>
              <p style={this.barOverlap}>{`${this.props.playerStats.pHealth}/${this.props.playerStats.pMaxHealth}`}</p>
              </div>
              <ProgressBar bsStyle="success" now={Math.round((this.props.playerStats.pHealth / this.props.playerStats.pMaxHealth) * 100)}/>
              <h2>Energy</h2>
              <div style={this.centerBarText}>
              <p style={this.barOverlap}>{`${this.props.playerStats.pEnergy}/${this.props.playerStats.pMaxEnergy}`}</p>
              </div>
              <ProgressBar bsStyle="info" now={Math.round((this.props.playerStats.pEnergy / this.props.playerStats.pMaxEnergy) * 100)}/>
              <h2>Experience</h2>
              <div style={this.centerBarText}>
                <p style={this.barOverlap}>{`${this.props.playerStats.pExperience}/${this.props.playerStats.pMaxExperience}`}</p>
              </div>
              <ProgressBar bsStyle="warning" now={Math.round((this.props.playerStats.pExperience / this.props.playerStats.pMaxExperience) * 100)}/>
              <h2>Block setup </h2>
              <img onMouseDown={(e) => this.handleLeftBlockClick(e)} src={this.props.blockMechanic.leftBlockPoints === 1 ? blockLeft1 : this.props.blockMechanic.leftBlockPoints === 2 ? blockLeft2 : this.props.blockMechanic.leftBlockPoints === 3 ? blockLeft3 : blockPlaceholder} style={this.imageBlockStyle}/>
              <img onMouseDown={(e) => this.handleFrontBlockClick(e)} src={this.props.blockMechanic.frontBlockPoints === 1 ? blockFront1 : this.props.blockMechanic.frontBlockPoints === 2 ? blockFront2 : this.props.blockMechanic.frontBlockPoints === 3 ? blockFront3 : blockPlaceholder} style={this.imageBlockStyle}/>
              <img onMouseDown={(e) => this.handleRightBlockClick(e)} src={this.props.blockMechanic.rightBlockPoints === 1 ? blockRight1 : this.props.blockMechanic.rightBlockPoints === 2 ? blockRight2 : this.props.blockMechanic.rightBlockPoints === 3 ? blockRight3 : blockPlaceholder} style={this.imageBlockStyle}/>
              <p>Points undistributed: {this.props.blockMechanic.unusedBlockPoints}</p>
              <hr/>
              <div style={{marginBottom: '12px'}}>
                <Button style={this.state.viewedTab === 'attributes' ? {fontWeight: 'bold'} : null} onClick={() => this.setState({viewedTab: 'attributes'})}>Attributes</Button>
                <Button style={this.state.viewedTab === 'details' ? {fontWeight: 'bold'} : null} onClick={() => this.setState({viewedTab: 'details'})}>Details</Button>
                <Button style={this.state.viewedTab === 'abilities' ? {fontWeight: 'bold'} : null} onClick={() => this.setState({viewedTab: 'abilities'})}>Abilities</Button>
                <Button style={this.state.viewedTab === 'equipment' ? {fontWeight: 'bold'} : null} onClick={() => this.setState({viewedTab: 'equipment'})}>Equipment</Button>
              </div>
              {this.state.viewedTab === 'attributes' ? (
                <div>
                  <h2>Attributes</h2>
                  <Col xs={6} sm={6} md={6} lg={7}>
                    <h3>Strength:</h3>
                    <h3>Wisdom:</h3>
                    <h3>Agility:</h3>
                    <h3>Constitution:</h3>
                  </Col>
                  <Col xs={6} sm={6} md={6} lgPush={1} lg={4}>
                    <h3>{this.props.playerStats.pStrength} {this.props.playerStats.pStatPoints !== 0 ? <span onClick={() => this.handleStatDistribution('str')} style={this.addPoint}>+</span> : null}</h3>
                    <h3>{this.props.playerStats.pWisdom} {this.props.playerStats.pStatPoints !== 0 ? <span onClick={() => this.handleStatDistribution('wis')} style={this.addPoint}>+</span> : null}</h3>
                    <h3>{this.props.playerStats.pAgility} {this.props.playerStats.pStatPoints !== 0 ? <span onClick={() => this.handleStatDistribution('agi')} style={this.addPoint}>+</span> : null}</h3>
                    <h3>{this.props.playerStats.pConstitution} {this.props.playerStats.pStatPoints !== 0 ? <span onClick={() => this.handleStatDistribution('cons')} style={this.addPoint}>+</span> : null}</h3>
                  </Col>
                </div>
              ) : this.state.viewedTab === 'details' ? (
                <div>
                  <h2>Attack power</h2>
                  <h3>{this.props.playerStats.pAttackPowerMin} - {this.props.playerStats.pAttackPowerMax}</h3>
                  <h2>Magic damage</h2>
                  <h3>{this.props.playerStats.pMagicDamage}</h3>
                  <h2>Dodge chance</h2>
                  <h3>{this.props.playerStats.pBaseDodgeChance}%</h3>
                  <h3>Speed: {this.props.playerStats.pSpeed}</h3>
                  <h2>Armour</h2>
                  <h3>{this.props.playerStats.pArmour}</h3>
                  <p>Damage reduction: {this.props.playerStats.pDamageReduction}%</p>
                </div>
              ) : this.state.viewedTab === 'abilities' ? (
                <div>
                  <div>
                    Active abilities
                    <br/>
                    {
                      this.props.abilities.data.filter(e =>
                        e.req.strength <= this.props.playerStats.pStrength &&
                        e.req.wisdom <= this.props.playerStats.pWisdom &&
                        e.req.agility <= this.props.playerStats.pAgility &&
                        e.req.constitution <= this.props.playerStats.pConstitution &&
                        e.passive === false
                      ).map(i => (
                        <OverlayTrigger placement="right" overlay={
                          <Tooltip id="tooltip">
                            <div style={{fontWeight: 'bolder', color: "#c48323"}}>
                              {i.name}
                            </div>
                            <div>{i.energyCost} Energy</div>
                            <div>
                              Commands: {i.command.join(', ')}
                            </div>
                            <br/>
                            <div>
                              {i.description}
                            </div>
                            <br/>
                            <div>
                            Requirements:
                            <br/>
                            {i.req.strength !== 0 ? <div>Strength: {i.req.strength}</div> : null}
                            {i.req.wisdom !== 0 ? <div>Wisdom: {i.req.wisdom}</div> : null}
                            {i.req.agility !== 0 ? <div>Agility: {i.req.agility}</div> : null}
                            {i.req.constitution !== 0 ? <div>Constitution: {i.req.constitution}</div> : null}
                            </div>
                          </Tooltip>
                        }>
                          <img src={i.icon32} style={{margin: '4px'}}/>
                        </OverlayTrigger>
                      ))
                    }
                  </div>
                  <div>
                    Passive abilities
                    <br/>
                    {
                      this.props.abilities.usableAbilities.filter(i => i.passive === true).map(i => (
                        <OverlayTrigger placement="right" overlay={
                          <Tooltip>
                            <div style={{fontWeight: 'bolder', color: "#c48323"}}>
                              {i.name}
                            </div>
                            <br/>
                            <div>
                            {i.description}
                            </div>
                            <br/>
                            <div>
                              Requirements:
                              <br/>
                              {i.req.strength !== 0 ? <div>Strength: {i.req.strength}</div> : null}
                              {i.req.wisdom !== 0 ? <div>Wisdom: {i.req.wisdom}</div> : null}
                              {i.req.agility !== 0 ? <div>Agility: {i.req.agility}</div> : null}
                              {i.req.constitution !== 0 ? <div>Constitution: {i.req.constitution}</div> : null}
                            </div>
                          </Tooltip>
                        }>
                          <img src={i.icon32} style={{margin: '4px'}}/>
                        </OverlayTrigger>
                      ))
                    }
                  </div>
                </div>
              ) : this.state.viewedTab === 'equipment' ? (
                <div>
                  <div style={this.eqElStyle}>
                    <h4>Head:&nbsp;
                      {this.props.playerStats.helm !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('helm')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Torso:&nbsp;
                      {this.props.playerStats.bodyArmour !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('bodyArmour')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Belt:&nbsp;
                      {this.props.playerStats.belt !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('belt')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Legs:&nbsp;
                      {this.props.playerStats.leggings !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('leggings')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Boots:&nbsp;
                      {this.props.playerStats.boots !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('boots')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Weapon:&nbsp;
                      {this.props.playerStats.weapon !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('weapon')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Ring:&nbsp;
                      {this.props.playerStats.ring !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('ring')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                  <div style={this.eqElStyle}>
                    <h4>Amulet:&nbsp;
                      {this.props.playerStats.amulet !== null ? (
                        <OverlayTrigger placement="top" overlay={this.createEqTooltip('amulet')}>
                          <img src="http://lorempizza.com/32/32"/>
                        </OverlayTrigger>
                      ) : null
                      }
                    </h4>
                  </div>
                </div>
              ) : null}

            </Col>
        )
      }
    }
)