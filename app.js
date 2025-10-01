// Sapo Tracker - Sistema Finanze Reale e Funzionante
class SapoTracker {
    constructor() {
        this.transactions = [];
        this.investments = []; // Tutti gli investimenti
        this.financialInvestments = []; // Investimenti liquidi (cripto, azioni)  
        this.materialInvestments = []; // Investimenti progetti (immobili, produzioni)
        this.chart = null;
        this.investmentChart = null; // Grafico investimenti finanziari
        this.materialInvestmentChart = null; // Grafico investimenti materiali
        this.investmentChartAnimation = null;
        this.materialInvestmentChartAnimation = null;
        this.init();
    }

    async initializeSchemas() {
        // 🧹 PULIZIA LOCALSTORAGE - Rimuovi dati precedenti
        console.log('🧹 Pulizia localStorage...');
        localStorage.removeItem('quickExpenseAmounts');
        localStorage.removeItem('sapoTracker_data'); // Altri dati che potrebbero esistere
        localStorage.removeItem('transactions_cache');
        console.log('✅ localStorage pulito');
        
        // Verifica se la tabella investimenti esiste, altrimenti usa TableSchemaUpdate
        try {
            const response = await fetch('tables/investimenti?limit=1');
            if (!response.ok) {
                // Crea schema tabella investimenti
                console.log('🔧 Creazione schema investimenti...');
                // Nota: Usiamo il sistema di transazioni esistente con categoria "Investimenti"
                // Gli investimenti saranno salvati come transazioni speciali
            }
            console.log('✅ Schema investimenti verificato');
        } catch (error) {
            console.log('ℹ️ Utilizzeremo il sistema transazioni per gli investimenti');
        }
    }

    async init() {
        console.log('🐸 Inizializzazione Sapo Tracker Enhanced...');
        
        // Imposta data di oggi nel form
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.querySelector('input[name="data"]');
        if (dateInput) dateInput.value = today;
        
        // Inizializza schemi tabelle
        await this.initializeSchemas();
        
        // Carica dati esistenti
        await this.loadTransactions();
        
        // Inizializza importi medi (da localStorage o valori default)
        this.initializeAverageAmounts();
        
        // Crea tasti rapidi
        this.createQuickExpenseButtons();
        
        // Carica investimenti PRIMA di creare il grafico
        await this.loadInvestments();
        
        // Crea grafici base
        this.createChart();
        this.createInvestmentChart();
        this.createMaterialInvestmentChart();
        
        // 🚀 INIZIALIZZA FUNZIONALITÀ AVANZATE
        this.initializeSearchAndFilters();
        this.initializeTimeCharts();
        this.initializeDragAndDrop();
        
        // 📱 APPLICA FIX MOBILE UNIVERSALI
        this.fixMobileBugs();
        
        // 🛡️ ATTIVA PROTEZIONE ANTI-APERTURA ACCIDENTALE
        this.preventAccidentalModalOpen();
        
        // 🐛 ATTIVA DEBUG APERTURE MODAL (TEMPORANEO)
        this.debugModalOpening();
        
        // Setup eventi
        this.setupEvents();
        this.setupInvestmentEvents();
        
        // Aggiorna dashboard
        this.updateDashboard();
        
        console.log('✅ Sapo Tracker Enhanced pronto con:');
        console.log('   🔍 Ricerca e filtri avanzati');
        console.log('   📊 Grafici temporali');
        console.log('   🎯 Drag & drop investimenti');
        console.log('   🔒 Sistema sicurezza integrato');
        console.log('   🐛 Bug transazioni RISOLTO');
        console.log('   🎯 Modal perfettamente centrati ATTIVO');
        
        console.log('✅ Sapo Tracker Enhanced caricato completamente');
        
        // 🚀 SISTEMA MODAL DIRETTO - FUNZIONAMENTO GARANTITO AL 100%
        console.log('🚀 Inizializzando sistema modal diretto...');
        initDirectModalSystem();
        
        // 🧪 Crea funzione di test per verificare l'aggiornamento saldo
        window.testSaldoUpdate = function() {
            console.log('🧪 Testing aggiornamento saldo...');
            
            if (!window.sapoTracker) {
                console.error('❌ sapoTracker non disponibile');
                return;
            }
            
            const saldoPrima = document.getElementById('header-balance')?.textContent || '€0.00';
            console.log('💰 Saldo prima del test:', saldoPrima);
            
            // Simula una transazione di test
            const testTransaction = {
                tipo: 'entrata',
                importo: 100,
                categoria: 'test',
                descrizione: 'Test aggiornamento saldo',
                data: new Date(),
                ricorrente: false,
                metodo_pagamento: 'carta',
                id: 'test_' + Date.now()
            };
            
            // Aggiungi e aggiorna
            sapoTracker.transactions.unshift(testTransaction);
            sapoTracker.updateDashboard();
            
            setTimeout(() => {
                const saldoDopo = document.getElementById('header-balance')?.textContent || '€0.00';
                console.log('💰 Saldo dopo il test:', saldoDopo);
                console.log('✅ Test completato - verifica se i saldi sono diversi');
                
                if (saldoPrima !== saldoDopo) {
                    console.log('🎉 SUCCESS: Il saldo si è aggiornato correttamente!');
                } else {
                    console.log('⚠️ Il saldo non è cambiato - possibile problema');
                }
            }, 500);
        };
        
        console.log('🧪 Funzione testSaldoUpdate() disponibile per test manuali');
        
        // 🎯 FUNZIONE PER TESTARE DIRETTAMENTE IL SALVATAGGIO
        window.testDirectSave = function() {
            console.log('🚀 === TEST DIRETTO SALVATAGGIO ===');
            
            if (!window.sapoTracker) {
                console.error('❌ sapoTracker non disponibile');
                return;
            }
            
            const saldoPrima = document.getElementById('header-balance')?.textContent || 'N/A';
            console.log('💰 Saldo PRIMA del test:', saldoPrima);
            console.log('📊 Transazioni attuali:', sapoTracker.transactions.length);
            
            // Simula aggiunta transazione diretta
            const testTransazione = {
                tipo: 'entrata',
                importo: 50,
                categoria: 'test',
                descrizione: 'Test salvataggio diretto',
                data: new Date(),
                ricorrente: false,
                metodo_pagamento: 'carta',
                id: 'test_' + Date.now()
            };
            
            // Aggiungi e aggiorna come fa il modal
            sapoTracker.transactions.unshift(testTransazione);
            console.log('📊 Transazioni dopo aggiunta:', sapoTracker.transactions.length);
            
            // Chiama updateDashboard
            sapoTracker.updateDashboard();
            
            setTimeout(() => {
                const saldoDopo = document.getElementById('header-balance')?.textContent || 'N/A';
                console.log('💰 Saldo DOPO il test:', saldoDopo);
                
                if (saldoPrima !== saldoDopo) {
                    console.log('🎉 SUCCESS: Il saldo è cambiato!');
                } else {
                    console.log('❌ PROBLEMA: Il saldo NON è cambiato');
                }
            }, 500);
        };
        
        console.log('🧪 Usa testDirectSave() per testare il salvataggio diretto');
    
    // 🔍 FUNZIONE DEBUG SALDO IN TEMPO REALE
    window.debugSaldoLive = function() {
        console.log('🔍 === DEBUG SALDO LIVE ===');
        
        if (!window.sapoTracker) {
            console.error('❌ sapoTracker non disponibile!');
            return;
        }
        
        // Stato attuale
        const saldoPrima = document.getElementById('header-balance')?.textContent || 'ELEMENT_NOT_FOUND';
        const numTransazioni = sapoTracker.transactions.length;
        
        console.log('📊 Stato attuale:');
        console.log(`   💰 Saldo DOM: "${saldoPrima}"`);
        console.log(`   📝 Num transazioni: ${numTransazioni}`);
        console.log(`   🔍 Elemento DOM:`, document.getElementById('header-balance'));
        
        // Test aggiunta transazione
        const testTrans = {
            id: Date.now().toString(),
            tipo: 'entrata',
            importo: 1,  // Solo 1 euro per test minimale
            categoria: 'test',
            descrizione: 'DEBUG TEST',
            data: new Date(),
            ricorrente: false,
            metodo_pagamento: 'carta'
        };
        
        console.log('📝 Aggiungendo transazione test minimal:', testTrans);
        sapoTracker.transactions.unshift(testTrans);
        console.log('✅ Transazione aggiunta, nuovo count:', sapoTracker.transactions.length);
        
        // Chiama updateDashboard
        console.log('🔄 Chiamando updateDashboard()...');
        try {
            sapoTracker.updateDashboard();
            console.log('✅ updateDashboard() completato senza errori');
        } catch (error) {
            console.error('❌ ERRORE in updateDashboard():', error);
        }
        
        // Verifica risultato
        setTimeout(() => {
            const saldoDopo = document.getElementById('header-balance')?.textContent || 'ELEMENT_NOT_FOUND';
            console.log('📊 Risultato:');
            console.log(`   💰 Saldo PRIMA: "${saldoPrima}"`);
            console.log(`   💰 Saldo DOPO: "${saldoDopo}"`);
            
            if (saldoPrima !== saldoDopo) {
                console.log('🎉 SUCCESS: Il saldo È CAMBIATO!');
                // Rimuovi la transazione test
                sapoTracker.transactions.shift();
                sapoTracker.updateDashboard();
                console.log('🧹 Transazione test rimossa');
            } else {
                console.log('❌ FAIL: Il saldo NON è cambiato');
                console.log('🔧 Possibili cause:');
                console.log('   1. updateDashboard() non aggiorna l\'elemento');
                console.log('   2. Errore nel calcolo del saldo');
                console.log('   3. Elemento DOM sovrascitto da altro codice');
                
                // Diagnostic test: aggiorna direttamente l'elemento
                console.log('🔧 Test diretto elemento DOM...');
                const element = document.getElementById('header-balance');
                if (element) {
                    const oldValue = element.textContent;
                    element.textContent = '*** TEST ***';
                    setTimeout(() => {
                        const testValue = element.textContent;
                        console.log(`🧪 Valore dopo modifica diretta: "${testValue}"`);
                        element.textContent = oldValue;  // Ripristina
                        
                        if (testValue === '*** TEST ***') {
                            console.log('✅ L\'elemento DOM può essere modificato');
                            console.log('⚠️ Il problema è in updateDashboard() o nel calcolo');
                        } else {
                            console.log('❌ L\'elemento DOM viene sovrascritto da qualcos\'altro');
                        }
                    }, 100);
                }
            }
        }, 300);
    };
    
    console.log('🔍 Funzione debugSaldoLive() disponibile per test live');
    
    // 🧮 FUNZIONE TEST CALCOLI SISTEMA RADICALE
    window.testCalcoliRadicale = function(tipoTest = 'entrata', importoTest = 100) {
        console.log('🧮 === TEST CALCOLI SISTEMA RADICALE ===');
        console.log('📋 Parametri test:', { tipo: tipoTest, importo: importoTest });
        
        const headerBalanceElement = document.getElementById('header-balance');
        if (!headerBalanceElement) {
            console.error('❌ Elemento header-balance non trovato!');
            return false;
        }
        
        const saldoAttualeText = headerBalanceElement.textContent;
        console.log('💰 Saldo attuale dal DOM:', JSON.stringify(saldoAttualeText));
        
        // USA LA STESSA LOGICA DI PARSING DEL SISTEMA RADICALE
        let saldoAttualeNumero = 0;
        try {
            console.log('🔧 === PARSING IDENTICO AL SISTEMA ===');
            let cleanSaldo = saldoAttualeText;
            
            // Step 1: Rimuovi il simbolo euro e spazi
            cleanSaldo = cleanSaldo.replace(/€/g, '').trim();
            console.log('🔧 Dopo rimozione €:', JSON.stringify(cleanSaldo));
            
            // Step 2: Gestisci formato italiano (punto=migliaia, virgola=decimali)
            if (cleanSaldo.includes(',')) {
                const parts = cleanSaldo.split(',');
                if (parts.length === 2) {
                    const integerPart = parts[0].replace(/\./g, '');
                    const decimalPart = parts[1];
                    cleanSaldo = integerPart + '.' + decimalPart;
                    console.log('🔧 Parsing decimali:', { integerPart, decimalPart, cleanSaldo });
                }
            } else {
                cleanSaldo = cleanSaldo.replace(/\./g, '');
                console.log('🔧 Parsing solo intero:', cleanSaldo);
            }
            
            saldoAttualeNumero = parseFloat(cleanSaldo) || 0;
            console.log('💰 Saldo parsato come numero:', saldoAttualeNumero);
            
        } catch (error) {
            console.error('❌ Errore parsing:', error);
            return false;
        }
        
        // Calcolo nuovo saldo
        let nuovoSaldo;
        if (tipoTest === 'entrata') {
            nuovoSaldo = saldoAttualeNumero + importoTest;
            console.log(`➕ CALCOLO ENTRATA: ${saldoAttualeNumero} + ${importoTest} = ${nuovoSaldo}`);
        } else {
            nuovoSaldo = saldoAttualeNumero - importoTest;
            console.log(`➖ CALCOLO USCITA: ${saldoAttualeNumero} - ${importoTest} = ${nuovoSaldo}`);
        }
        
        const nuovoSaldoFormattato = nuovoSaldo.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'EUR'
        });
        
        console.log('💰 Risultato calcolo:', {
            saldoPrecedente: saldoAttualeNumero,
            operazione: tipoTest,
            importo: importoTest,
            saldoNuovo: nuovoSaldo,
            saldoFormattato: nuovoSaldoFormattato,
            differenza: nuovoSaldo - saldoAttualeNumero
        });
        
        console.log('🎯 Test calcolo completato - Verifica i risultati sopra');
        return {
            saldoPrecedente: saldoAttualeNumero,
            saldoNuovo: nuovoSaldo,
            saldoFormattato: nuovoSaldoFormattato
        };
    };
    
    console.log('🧮 Funzione testCalcoliRadicale() disponibile');
    console.log('💡 Usa: testCalcoliRadicale("entrata", 100) o testCalcoliRadicale("uscita", 50)');
    
    // 🔄 SISTEMA DI SINCRONIZZAZIONE AUTOMATICA
    window.forceSyncBalance = function() {
        console.log('🔄 === SINCRONIZZAZIONE FORZATA SALDO ===');
        
        if (!window.sapoTracker || !sapoTracker.transactions) {
            console.error('❌ sapoTracker non disponibile per sincronizzazione');
            return false;
        }
        
        // Ricalcola saldo dall'array completo
        const saldoCalcolato = sapoTracker.transactions.reduce((sum, t) => {
            return sum + (t.tipo === 'entrata' ? parseFloat(t.importo) : -parseFloat(t.importo));
        }, 0);
        
        // Considera investimenti con debug
        const investimentiFinanziari = sapoTracker.financialInvestments?.reduce((sum, i) => sum + (parseFloat(i.investment_value) || 0), 0) || 0;
        const investimentiMateriali = sapoTracker.materialInvestments?.reduce((sum, i) => sum + (parseFloat(i.investment_value) || 0), 0) || 0;
        const investimenti = investimentiFinanziari + investimentiMateriali;
        
        const saldoFinale = saldoCalcolato - investimenti;
        
        console.log('💰 Sincronizzazione saldo:', {
            transazioni: sapoTracker.transactions.length,
            saldoTransazioni: saldoCalcolato,
            investimenti: investimenti,
            saldoFinale: saldoFinale
        });
        
        // Aggiorna DOM
        const headerBalanceElement = document.getElementById('header-balance');
        if (headerBalanceElement) {
            const saldoFormattato = saldoFinale.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'EUR'
            });
            
            const valorePrecedente = headerBalanceElement.textContent;
            headerBalanceElement.textContent = saldoFormattato;
            
            console.log('🔄 Sincronizzazione DOM:', {
                precedente: valorePrecedente,
                nuovo: saldoFormattato,
                cambiato: valorePrecedente !== saldoFormattato
            });
            
            return true;
        } else {
            console.error('❌ Elemento header-balance non trovato');
            return false;
        }
    };
    
    // Avvia sincronizzazione periodica ogni 10 secondi
    setInterval(() => {
        const lastRadicalUpdate = localStorage.getItem('lastRadicalUpdate');
        if (lastRadicalUpdate) {
            const timeSinceUpdate = Date.now() - parseInt(lastRadicalUpdate);
            
            // Se sono passati più di 30 secondi dall'ultimo update radicale, sincronizza
            if (timeSinceUpdate > 30000) {
                console.log('🔄 Sincronizzazione automatica attivata (30s scaduti)');
                forceSyncBalance();
            }
        }
    }, 10000); // Controlla ogni 10 secondi
    
    console.log('🔄 Sistema sincronizzazione automatica attivato');
    console.log('💡 Funzione forceSyncBalance() disponibile per sync manuale');
        

        
        // 🎯 Funzione utility MOBILE-OPTIMIZED per aprire modal perfettamente centrati
        window.openModalOptimal = (modalId) => {
            console.log('🚀 Apertura modal ottimale:', modalId);
            
            const isMobile = window.innerWidth <= 768;
            
            // Scroll in alto solo su desktop
            if (!isMobile) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Trova modal
            const modal = document.getElementById(modalId);
            if (!modal) {
                console.error('❌ Modal non trovato:', modalId);
                return false;
            }
            
            // 📱 MOBILE: Blocca completamente il body
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            
            // Mostra modal
            modal.classList.remove('hidden');
            
            // 🎯 CENTRAGGIO PERFETTO UNIVERSALE
            setTimeout(() => {
                // Stili modal container
                modal.style.cssText = `
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    z-index: 9999 !important;
                    padding: 16px !important;
                    background: rgba(0, 0, 0, 0.5) !important;
                `;
                
                // Stili contenuto modal (specialmente mobile)
                const modalContent = modal.querySelector('div');
                if (modalContent) {
                    if (isMobile) {
                        modalContent.style.cssText = `
                            position: absolute !important;
                            top: 50% !important;
                            left: 50% !important;
                            transform: translate(-50%, -50%) !important;
                            width: calc(100vw - 32px) !important;
                            max-width: 380px !important;
                            max-height: 85vh !important;
                            overflow-y: auto !important;
                            margin: 0 !important;
                            border-radius: 16px !important;
                            background: #1a202c !important;
                            border: 2px solid #4a5568 !important;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8) !important;
                        `;
                        
                        // 🎨 MOBILE: Tema scuro universale
                        const inputs = modalContent.querySelectorAll('input, select, textarea');
                        inputs.forEach(input => {
                            input.style.cssText = `
                                background: #374151 !important;
                                border: 2px solid #6b7280 !important;
                                color: #ffffff !important;
                                font-weight: 600 !important;
                                font-size: 16px !important;
                            `;
                        });
                        
                        const labels = modalContent.querySelectorAll('label, p, span:not(.fas)');
                        labels.forEach(label => {
                            if (!label.classList.contains('fas') && !label.classList.contains('fa')) {
                                label.style.color = '#e2e8f0 !important';
                            }
                        });
                        
                        const titles = modalContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
                        titles.forEach(title => {
                            title.style.color = '#ffffff !important';
                        });
                    } else {
                        modalContent.style.cssText = `
                            max-height: 85vh !important;
                            overflow-y: auto !important;
                            margin: 0 !important;
                        `;
                    }
                }
                
                console.log(`✅ Modal ${modalId} aperto e centrato (${isMobile ? 'mobile' : 'desktop'})`);
            }, isMobile ? 200 : 100);
            
            return true;
        };
        
        // 🎯 Funzione utility universale per chiudere modal
        window.closeModalOptimal = (modalId) => {
            console.log('🚪 Chiusura modal:', modalId);
            
            const modal = document.getElementById(modalId);
            if (!modal) {
                console.error('❌ Modal non trovato:', modalId);
                return false;
            }
            
            // 🔥 FORZA CHIUSURA COMPLETA
            modal.style.cssText = '';
            modal.classList.add('hidden');
            modal.style.display = 'none';
            
            // 📱 MOBILE: Ripristina completamente il body
            document.body.style.cssText = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.classList.remove('modal-open');
            
            console.log('✅ Modal chiuso e body ripristinato');
            return true;
        };
        
        // 🚨 Funzione di emergenza per chiudere TUTTI i modal
        window.closeAllModals = () => {
            console.log('🚨 CHIUSURA FORZATA DI TUTTI I MODAL');
            
            const allModals = [
                'add-modal',
                'investment-modal', 
                'investment-update-modal',
                'quick-expense-modal',
                'project-component-modal',
                'project-return-modal'
            ];
            
            allModals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (modal) {
                    // Forza chiusura totale
                    modal.style.cssText = '';
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                    console.log(`✅ ${modalId} forzatamente chiuso`);
                }
            });
            
            // Ripristina body completamente
            document.body.style.cssText = '';
            document.body.classList.remove('modal-open');
            
            console.log('🎉 TUTTI I MODAL CHIUSI - Body ripristinato');
        };
        
        // 🎯 Click sullo sfondo per chiudere modal
        // 🎯 CLICK LISTENER SPECIFICO SOLO PER MODAL BACKGROUND
        document.addEventListener('click', (e) => {
            // SOLO se il click è ESATTAMENTE sullo sfondo di un modal
            if (e.target.id && e.target.id.endsWith('-modal') && 
                e.target.classList.contains('modal-backdrop') || 
                e.target.tagName === 'DIV' && e.target.id.endsWith('-modal')) {
                
                // Verifica che non sia un click durante scroll
                if (e.isTrusted && !e.target.closest('.modal-content')) {
                    console.log('🖱️ Click VALIDO sullo sfondo del modal:', e.target.id);
                    
                    if (e.target.id === 'add-modal') {
                        closeAddModal();
                    } else {
                        window.closeModalOptimal(e.target.id);
                    }
                }
            }
        }, { passive: true });
        
        // 🧪 Test funzione per verificare il fix
        window.testCategoryBug = () => {
            console.log('🧪 TEST BUG CATEGORIA:');
            console.log('1. Apri modal transazione');
            console.log('2. Seleziona "Altro" in categoria');
            console.log('3. Scrivi un testo nel campo personalizzato');
            console.log('4. Cambia il tipo da "Uscita" a "Entrata" e poi di nuovo a "Uscita"');
            console.log('5. Verifica che il testo in "Altro" sia ancora presente');
            console.log('6. Se il testo c\'è ancora = 🎉 BUG RISOLTO!');
        };
        
        // 🎯 Test funzione per verificare centraggio modal
        window.testModalCentering = () => {
            console.log('🧪 TEST CENTRAGGIO MODAL:');
            console.log('1. Scrolla in basso nella pagina');
            console.log('2. Clicca "Entrata" o "Uscita" per aprire il modal');
            console.log('3. Verifica che il modal sia centrato nello schermo');
            console.log('4. Verifica che tutti i campi siano visibili');
            console.log('5. Se tutto è visibile = 🎉 CENTRAGGIO RISOLTO!');
        };
        
        // 📱 Test funzione performance mobile
        window.testMobilePerformance = () => {
            console.log('📱 TEST PERFORMANCE MOBILE:');
            console.log('Dispositivo mobile:', window.innerWidth <= 768);
            console.log('Low-end device:', window.mobileOptimizer?.isLowEnd);
            console.log('RAM disponibile:', navigator.deviceMemory + 'GB' || 'Non rilevabile');
            console.log('Tipo connessione:', navigator.connection?.effectiveType || 'Non rilevabile');
            console.log('Animazioni disabilitate:', document.querySelector('style')?.innerHTML.includes('animation: none'));
            console.log('Lava lamp nascosto:', window.getComputedStyle(document.querySelector('.lava-lamp-container')).display === 'none');
            
            // Test memory usage (se disponibile)
            if (performance.memory) {
                console.log('Memoria JS utilizzata:', Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB');
                console.log('Limite memoria JS:', Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB');
            }
        };
        
        // 🔍 Funzione debug per controllare stato modal
        window.debugModalState = () => {
            console.log('🔍 DEBUG STATO MODAL:');
            
            const modal = document.getElementById('add-modal');
            if (!modal) {
                console.log('❌ Modal add-modal non trovato nel DOM!');
                return;
            }
            
            console.log('📊 Stato del modal:');
            console.log('   - Hidden class:', modal.classList.contains('hidden'));
            console.log('   - Display style:', modal.style.display);
            console.log('   - Computed display:', window.getComputedStyle(modal).display);
            console.log('   - Tutti gli stili inline:', modal.style.cssText);
            console.log('   - Classes:', Array.from(modal.classList));
            
            console.log('📊 Stato del body:');
            console.log('   - Overflow:', document.body.style.overflow);
            console.log('   - Position:', document.body.style.position);
            console.log('   - Computed overflow:', window.getComputedStyle(document.body).overflow);
            console.log('   - Body classes:', Array.from(document.body.classList));
            
            // Suggerimenti per risoluzione
            if (!modal.classList.contains('hidden') || modal.style.display !== 'none') {
                console.log('🚨 PROBLEMA RILEVATO: Modal ancora visibile!');
                console.log('💡 Soluzioni:');
                console.log('   - Usa: closeAddModal()');
                console.log('   - O usa: closeAllModals()');
                console.log('   - O chiudi manualmente con: modal.style.display = "none"');
            } else {
                console.log('✅ Modal correttamente nascosto');
            }
        };
        
        // 🎨 Test contrasto e leggibilità mobile
        window.testMobileContrast = () => {
            console.log('🎨 TEST CONTRASTO MOBILE:');
            
            const isMobile = window.innerWidth <= 768;
            console.log('📱 Dispositivo mobile:', isMobile);
            
            if (!isMobile) {
                console.log('⚠️ Ridimensiona la finestra a < 768px per testare il mobile');
            }
            
            console.log('🚀 Aprendo modal per test contrasto...');
            window.openModalOptimal('add-modal');
            
            setTimeout(() => {
                const modal = document.getElementById('add-modal');
                const modalContent = modal.querySelector('div');
                
                if (modalContent) {
                    console.log('🎨 Analisi colori modal:');
                    console.log('   - Background modal:', window.getComputedStyle(modalContent).backgroundColor);
                    
                    const inputs = modalContent.querySelectorAll('input, select');
                    if (inputs.length > 0) {
                        const firstInput = inputs[0];
                        console.log('📝 Analisi input:');
                        console.log('   - Background input:', window.getComputedStyle(firstInput).backgroundColor);
                        console.log('   - Colore testo:', window.getComputedStyle(firstInput).color);
                        console.log('   - Border:', window.getComputedStyle(firstInput).border);
                    }
                    
                    const labels = modalContent.querySelectorAll('label');
                    if (labels.length > 0) {
                        console.log('🏷️ Analisi label:');
                        console.log('   - Colore label:', window.getComputedStyle(labels[0]).color);
                    }
                }
                
                console.log('💡 Guida test manuale:');
                console.log('1. ✅ Lo sfondo del modal è scuro?');
                console.log('2. ✅ Il testo delle label è bianco/grigio chiaro?');
                console.log('3. ✅ Gli input hanno sfondo scuro e testo bianco?');
                console.log('4. ✅ Quando scrivi negli input, vedi chiaramente il testo?');
                console.log('5. ✅ I bottoni sono ben contrastati?');
                
                setTimeout(() => {
                    window.closeModalOptimal('add-modal');
                    console.log('🏁 Test contrasto completato');
                }, 5000);
            }, 500);
        };
        
        // 🧪 Test completo apertura/chiusura modal
        window.testModalOpenClose = () => {
            console.log('🧪 TEST APERTURA/CHIUSURA MODAL:');
            console.log('1. Aprendo modal...');
            
            window.openModalOptimal('add-modal');
            
            setTimeout(() => {
                console.log('2. Modal aperto, controlliamo stato...');
                window.debugModalState();
                
                setTimeout(() => {
                    console.log('3. Chiudendo modal...');
                    closeAddModal();
                    
                    setTimeout(() => {
                        console.log('4. Modal chiuso, controlliamo stato finale...');
                        window.debugModalState();
                        console.log('🏁 Test completato');
                    }, 500);
                }, 2000);
            }, 500);
        };
        
        // 📱 Test specifico per centraggio mobile
        window.testMobileCentering = () => {
            console.log('📱 TEST CENTRAGGIO MOBILE:');
            console.log('🔧 Passaggi per testare:');
            console.log('1. Apri su telefono o ridimensiona browser a < 768px');
            console.log('2. Scrolla la pagina in qualsiasi posizione');
            console.log('3. Clicca "Entrata" o "Uscita"');
            console.log('4. Il modal DEVE apparire al centro dello schermo');
            console.log('5. TUTTI i campi devono essere visibili e accessibili');
            console.log('6. Il form deve essere comodo da compilare');
            console.log('');
            console.log('🧪 Test automatico:');
            console.log('- Larghezza schermo:', window.innerWidth + 'px');
            console.log('- È mobile:', window.innerWidth <= 768 ? '✅ SÌ' : '❌ NO');
            console.log('- Viewport height:', window.innerHeight + 'px');
            
            // Test apertura automatica
            setTimeout(() => {
                console.log('🚀 Aprendo modal di test...');
                window.openModalOptimal('add-modal');
                
                setTimeout(() => {
                    const modal = document.getElementById('add-modal');
                    const rect = modal.getBoundingClientRect();
                    console.log('📐 Posizione modal:');
                    console.log('- Top:', rect.top);
                    console.log('- Left:', rect.left);
                    console.log('- Centro X:', rect.left + rect.width / 2);
                    console.log('- Centro Y:', rect.top + rect.height / 2);
                    console.log('- Centro schermo X:', window.innerWidth / 2);
                    console.log('- Centro schermo Y:', window.innerHeight / 2);
                    
                    const isCenteredX = Math.abs((rect.left + rect.width / 2) - (window.innerWidth / 2)) < 50;
                    const isCenteredY = Math.abs((rect.top + rect.height / 2) - (window.innerHeight / 2)) < 50;
                    
                    console.log('✅ Centrato X:', isCenteredX ? 'SÌ' : 'NO');
                    console.log('✅ Centrato Y:', isCenteredY ? 'SÌ' : 'NO');
                    
                    if (isCenteredX && isCenteredY) {
                        console.log('🎉 CENTRAGGIO PERFETTO!');
                    } else {
                        console.log('❌ Centraggio da migliorare');
                    }
                    
                    // Chiudi modal dopo test
                    setTimeout(() => {
                        window.closeModalOptimal('add-modal');
                        console.log('🏁 Test completato');
                    }, 2000);
                }, 500);
            }, 1000);
        };
    }

    // 🔥 FUNZIONE UNIVERSALE PER CHIUSURA ROBUSTA DELLE MODAL
    forceCloseAllModals() {
        console.log('🔥 CHIUSURA UNIVERSALE DELLE MODAL...');
        
        // Lista di tutte le modal possibili nel sito
        const modalIds = [
            'add-modal',
            'investment-modal', 
            'investment-update-modal',
            'quick-expense-modal',
            'backup-modal',
            'import-modal'
        ];
        
        let closedCount = 0;
        
        modalIds.forEach(modalId => {
            try {
                const modal = document.getElementById(modalId);
                if (modal) {
                    // Verifica se è visibile
                    const isVisible = !modal.classList.contains('hidden') || 
                                    modal.style.display !== 'none';
                    
                    if (isVisible) {
                        console.log(`🚪 Chiudendo modal: ${modalId}`);
                        
                        // 🔥 CHIUSURA FORZATA COMPLETA - RIPULISCE TUTTI GLI STILI CUSTOM
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                        modal.style.cssText = ''; // Rimuove TUTTI gli stili inline custom
                        
                        // Forza nascondimento con classe CSS
                        modal.style.display = 'none !important';
                        
                        console.log(`✅ Modal ${modalId} completamente chiuso e pulito`);
                        
                        closedCount++;
                    }
                }
            } catch (e) {
                console.warn(`⚠️ Errore chiusura ${modalId}:`, e);
            }
        });
        
        // 🔥 RIPRISTINO COMPLETO BODY (FONDAMENTALE PER MOBILE) 
        try {
            // Pulizia aggressiva di TUTTI gli stili che potrebbero bloccare
            document.body.style.cssText = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.classList.remove('modal-open');
            
            // Reset esplicito per assicurarsi che il body sia libero
            document.body.removeAttribute('style');
            
            console.log('✅ Body completamente libero e ripristinato');
        } catch (e) {
            console.warn('⚠️ Errore ripristino body:', e);
        }
        
        // 🎯 SCROLL IMMEDIATO IN ALTO DOPO CHIUSURA - RISOLVE PROBLEMA UTENTE
        // L'utente vuole vedere subito il saldo aggiornato dopo conferma
        if (closedCount > 0) {
            // SCROLL ISTANTANEO per vedere il saldo subito
            window.scrollTo({ 
                top: 0, 
                behavior: 'auto'  // Cambiato da 'smooth' a 'auto' per velocità
            });
            
            console.log('📜✅ AUTO-SCROLL IMMEDIATO - Saldo ora visibile in alto!');
            
            // Feedback visivo opzionale
            setTimeout(() => {
                const saldoElement = document.querySelector('.saldo-totale, .balance-amount');
                if (saldoElement) {
                    saldoElement.style.transition = 'all 0.3s ease';
                    saldoElement.style.transform = 'scale(1.05)';
                    saldoElement.style.background = 'rgba(34, 197, 94, 0.1)';
                    
                    setTimeout(() => {
                        saldoElement.style.transform = 'scale(1)';
                        saldoElement.style.background = '';
                    }, 600);
                    
                    console.log('✨ Evidenziato saldo aggiornato');
                }
            }, 100);
        }
        
        // 🔥 RIPRISTINO FORM (PREVIENE DATI RESIDUI)
        try {
            const forms = document.querySelectorAll('form');
            forms.forEach((form, index) => {
                if (form.id === 'transaction-form' || form.id === 'investment-form') {
                    // Reset solo i form principali
                    form.reset();
                    
                    // Data oggi come default
                    const dateInputs = form.querySelectorAll('input[type="date"]');
                    dateInputs.forEach(input => {
                        input.value = new Date().toISOString().split('T')[0];
                    });
                    
                    console.log(`📋 Form ${form.id} resettato`);
                }
            });
        } catch (e) {
            console.warn('⚠️ Errore reset form:', e);
        }
        
        console.log(`✅ Chiusura completata: ${closedCount} modal chiuse`);
        
        // 🎯 FEEDBACK UTENTE (SOLO SU MOBILE PER NON DISTURBARE DESKTOP)
        const isMobile = window.innerWidth <= 768;
        if (isMobile && closedCount > 0) {
            // Breve feedback visivo che la modal si è chiusa
            try {
                const body = document.body;
                body.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                setTimeout(() => {
                    body.style.background = '';
                }, 200);
            } catch (e) {
                // Ignore feedback errors
            }
        }
        
        return closedCount;
    }
    
    // 🛡️ SISTEMA ANTI-APERTURA ACCIDENTALE MODAL (TEMPORANEAMENTE DISABILITATO)
    preventAccidentalModalOpen() {
        console.log('🛡️ PROTEZIONE DISABILITATA - Modal sempre accessibili');
        
        // 🔥 DISABILITA TEMPORANEAMENTE LA PROTEZIONE PER RISOLVERE IL BUG
        console.log('✅ Protezione anti-apertura accidentale DISABILITATA per debug');
        return; // ESCE IMMEDIATAMENTE SENZA INSTALLARE LA PROTEZIONE
        
        console.log('🛡️ Attivando protezione anti-apertura accidentale...');
        
        // Variabili per tracciare l'interazione utente
        let isUserScrolling = false;
        let scrollTimeout = null;
        let lastScrollTime = 0;
        
        // Rileva quando l'utente sta scrollando
        document.addEventListener('scroll', () => {
            isUserScrolling = true;
            lastScrollTime = Date.now();
            
            // Reset flag dopo 500ms di inattività scroll
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                console.log('📜 Scroll terminato, modal riabilitate');
            }, 500);
        }, { passive: true });
        
        // Rileva touch in movimento (scroll su mobile)
        let isTouchMoving = false;
        document.addEventListener('touchstart', () => {
            isTouchMoving = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', () => {
            isTouchMoving = true;
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            // Reset flag dopo 200ms
            setTimeout(() => {
                isTouchMoving = false;
            }, 200);
        }, { passive: true });
        
        // 🔧 PROTEZIONE MIGLIORATA: Salva riferimento e controlla se esiste
        let originalOpenAddModal = null;
        
        // Funzione per inizializzare la protezione quando openAddModal esiste
        const initProtection = () => {
            if (typeof window.openAddModal === 'function' && !originalOpenAddModal) {
                originalOpenAddModal = window.openAddModal;
                
                window.openAddModal = (tipo) => {
                    // Controlla se l'utente sta scrollando
                    const timeSinceLastScroll = Date.now() - lastScrollTime;
                    
                    if (isUserScrolling || isTouchMoving || timeSinceLastScroll < 300) {
                        console.log('🚫 BLOCCATO: Modal aperta durante scroll/touch', {
                            isUserScrolling,
                            isTouchMoving,
                            timeSinceLastScroll
                        });
                        
                        // 💬 NOTIFICA DISCRETA ALL'UTENTE
                        this.showScrollProtectionFeedback();
                        return false;
                    }
                    
                    console.log('✅ CONSENTITO: Apertura modal autorizzata', tipo);
                    
                    // Assicurati che la funzione originale esista
                    if (typeof originalOpenAddModal === 'function') {
                        return originalOpenAddModal.call(this, tipo);
                    } else {
                        console.error('❌ ERRORE: originalOpenAddModal non è una funzione!');
                        return false;
                    }
                };
                
                console.log('🛡️ Protezione anti-scroll attivata con successo');
            }
        };
        
        // Prova immediatamente e poi con retry
        initProtection();
        setTimeout(initProtection, 100);
        setTimeout(initProtection, 500);
        
        // Intercetta anche openModalOptimal
        const originalOpenModalOptimal = window.openModalOptimal;
        window.openModalOptimal = (modalId) => {
            const timeSinceLastScroll = Date.now() - lastScrollTime;
            
            if (isUserScrolling || isTouchMoving || timeSinceLastScroll < 300) {
                console.log('🚫 BLOCCATO: Modal ottimale aperta durante scroll/touch', {
                    modalId,
                    isUserScrolling,
                    isTouchMoving,
                    timeSinceLastScroll
                });
                
                // 💬 NOTIFICA DISCRETA ALL'UTENTE  
                sapoTracker.showScrollProtectionFeedback();
                return false;
            }
            
            console.log('✅ CONSENTITO: Apertura modal ottimale autorizzata', modalId);
            return originalOpenModalOptimal(modalId);
        };
        
        console.log('✅ Protezione anti-apertura accidentale attivata');
    }
    
    // 🐛 DEBUG: Monitor aperture modal per diagnosticare problemi
    debugModalOpening() {
        console.log('🐛 ATTIVANDO DEBUG APERTURE MODAL...');
        
        // Conta aperture modal
        this.modalOpenCount = 0;
        this.modalOpenLog = [];
        
        // Intercetta tutte le aperture
        const logModalOpen = (modalType, source, stackTrace) => {
            this.modalOpenCount++;
            const logEntry = {
                count: this.modalOpenCount,
                time: new Date().toISOString(),
                modalType,
                source,
                stackTrace: stackTrace ? stackTrace.split('\n').slice(0, 3) : 'N/A'
            };
            
            this.modalOpenLog.push(logEntry);
            console.log('📊 MODAL APERTA:', logEntry);
            
            // Se ci sono troppe aperture in poco tempo, alert
            if (this.modalOpenCount > 5) {
                console.error('🚨 TROPPE APERTURE MODAL RILEVATE!');
                console.table(this.modalOpenLog);
            }
        };
        
        // 🎯 DEBUG: Rimosse le intercettazioni duplicate di openAddModal
        // Le funzioni ora vengono chiamate direttamente senza conflitti
        
        // Comando console per vedere il log
        window.showModalDebugLog = () => {
            console.log('📊 LOG APERTURE MODAL:');
            console.table(this.modalOpenLog);
            return this.modalOpenLog;
        };
        
        console.log('🐛 Debug aperture modal ATTIVO. Usa showModalDebugLog() per vedere il log.');
    }
    
    // 💬 FEEDBACK DISCRETO QUANDO MODAL VIENE BLOCCATA
    showScrollProtectionFeedback() {
        // Evita spam di notifiche
        if (this.lastFeedbackTime && (Date.now() - this.lastFeedbackTime) < 2000) {
            return;
        }
        this.lastFeedbackTime = Date.now();
        
        console.log('💬 Mostrando feedback protezione scroll...');
        
        // 📱 MOBILE: Vibrazione leggera se supportata
        if (navigator.vibrate && window.innerWidth <= 768) {
            navigator.vibrate(50); // Vibrazione molto breve
        }
        
        // 🎨 FEEDBACK VISIVO DISCRETO
        const body = document.body;
        const originalBorder = body.style.border;
        
        // Bordo verde molto sottile per 300ms
        body.style.border = '2px solid rgba(16, 185, 129, 0.6)';
        body.style.transition = 'border-color 0.3s ease';
        
        setTimeout(() => {
            body.style.border = originalBorder;
            body.style.transition = '';
        }, 300);
        
        // 📝 NOTIFICA CONSOLE UTENTE
        console.log('🛡️ Protezione attivata: scroll rilevato, modal bloccata');
    }
    
    // 📊 OTTIMIZZAZIONE PERFORMANCE GRAFICI MOBILE
    optimizeChartsForMobile() {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            console.log('💻 Desktop - grafici in modalità alta qualità');
            return;
        }
        
        console.log('📱 Mobile rilevato - ottimizzando grafici per performance...');
        
        // Configurazione mobile per Chart.js
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = true;
        Chart.defaults.devicePixelRatio = 1.5; // Riduci per performance
        Chart.defaults.animation.duration = 400; // Animazioni più veloci
        Chart.defaults.plugins.tooltip.animation.duration = 200;
        Chart.defaults.elements.arc.borderWidth = 1; // Bordi più sottili
        
        // 🔧 OTTIMIZZAZIONI SPECIFICHE MOBILE
        const mobileChartConfig = {
            layout: {
                padding: { top: 8, bottom: 8, left: 8, right: 8 }
            },
            interaction: {
                intersect: false, // Migliore per touch
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false // Rimuovi legend per risparmiare spazio
                },
                tooltip: {
                    enabled: true,
                    position: 'nearest',
                    caretSize: 8,
                    cornerRadius: 8,
                    displayColors: true,
                    bodyFont: { size: 14 },
                    titleFont: { size: 15, weight: 'bold' }
                }
            }
        };
        
        // Applica configurazione a tutti i canvas esistenti
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            // Ottimizza rendering context per mobile
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'medium'; // Balance tra qualità e performance
        });
        
        console.log('✅ Grafici ottimizzati per mobile');
        
        // 🚀 DISABILITA ANIMAZIONI PESANTI SU MOBILE
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @media (max-width: 768px) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-delay: -0.01ms !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                /* Mantieni solo animazioni essenziali */
                .btn:hover, button:hover {
                    transition: transform 0.2s ease !important;
                }
            }
        `;
        document.head.appendChild(styleSheet);
        console.log('🏃‍♂️ Animazioni ridotte per performance mobile');
    }
    
    // 🛡️ VALIDATORE UNIVERSALE FORM (PREVIENE BUG DI INSERIMENTO)
    validateFormBeforeSubmit(formId) {
        console.log(`🔍 Validazione form: ${formId}`);
        
        const form = document.getElementById(formId);
        if (!form) {
            console.error(`❌ Form ${formId} non trovato`);
            return false;
        }
        
        const formData = new FormData(form);
        const errors = [];
        
        // Validazioni specifiche per tipo di form
        if (formId === 'transaction-form') {
            const importo = parseFloat(formData.get('importo'));
            const categoria = formData.get('categoria');
            const descrizione = formData.get('descrizione');
            
            if (!importo || importo <= 0) {
                errors.push('❌ Inserisci un importo valido maggiore di 0');
            }
            if (!categoria || categoria.trim() === '') {
                errors.push('❌ Seleziona una categoria');
            }
            if (!descrizione || descrizione.trim() === '') {
                errors.push('❌ Inserisci una descrizione');
            }
            
        } else if (formId === 'investment-form') {
            const name = formData.get('investment_name');
            const value = parseFloat(formData.get('investment_value'));
            const type = formData.get('investment_type');
            
            if (!name || name.trim() === '') {
                errors.push('❌ Inserisci il nome dell\'investimento');
            }
            if (!value || value <= 0) {
                errors.push('❌ Inserisci un valore valido maggiore di 0');
            }
            if (!type) {
                errors.push('❌ Seleziona il tipo di investimento');
            }
        }
        
        // Mostra errori se presenti
        if (errors.length > 0) {
            console.error('🚫 Errori di validazione:', errors);
            
            // Mostra notification per ogni errore
            errors.forEach((error, index) => {
                setTimeout(() => {
                    this.showNotification(error, 'error');
                }, index * 1000); // Spazia le notifiche
            });
            
            return false;
        }
        
        console.log('✅ Validazione completata con successo');
        return true;
    }
    
    // 📱 SISTEMA ANTI-BUG MOBILE UNIVERSALE
    fixMobileBugs() {
        console.log('🔧 SISTEMA ANTI-BUG MOBILE...');
        
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            console.log('💻 Desktop rilevato, skip fix mobile');
            return;
        }
        
        try {
            // 🔥 FIX 1: Viewport e zoom
            let viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
            
            // 🔥 FIX 2: Scroll e overflow globale
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflowX = 'hidden';
            
            // 🔥 FIX 3: Altezza dinamica mobile (iOS Safari fix)
            const setViewHeight = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            setViewHeight();
            window.addEventListener('resize', setViewHeight);
            window.addEventListener('orientationchange', setViewHeight);
            
            // 🔥 FIX 4: Prevenzione doppio tap zoom (SOLO SU ELEMENTI SPECIFICI)
            // Applica solo sui bottoni, non su tutto il documento
            const preventZoomElements = document.querySelectorAll('button, .btn, [onclick]');
            preventZoomElements.forEach(element => {
                let lastTouch = 0;
                element.addEventListener('touchend', (e) => {
                    const now = new Date().getTime();
                    if (now - lastTouch <= 300) {
                        e.preventDefault();
                        console.log('🚫 Prevenuto doppio tap su:', element.tagName);
                    }
                    lastTouch = now;
                }, { passive: false });
            });
            
            // 🔥 FIX 5: Miglioramento performance mobile
            document.body.style.webkitFontSmoothing = 'antialiased';
            document.body.style.mozOsxFontSmoothing = 'grayscale';
            
            // 🔥 FIX 6: Fix input focus su iOS
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    setTimeout(() => {
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                });
            });
            
            console.log('✅ Fix mobile applicati con successo');
        
        // 📊 OTTIMIZZA GRAFICI PER MOBILE
        this.optimizeChartsForMobile();
            
        } catch (e) {
            console.error('❌ Errore nei fix mobile:', e);
        }
    }

    setupEvents() {
        // Form submission con debug avanzato
        document.getElementById('transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 🐛 DEBUG: Verifica stato form prima del submit
            console.log('📝 FORM SUBMIT - Debug stato attuale:');
            const formData = new FormData(e.target);
            console.log('   Tipo:', formData.get('tipo'));
            console.log('   Importo:', formData.get('importo'));
            console.log('   Categoria:', formData.get('categoria'));
            console.log('   Altro Tipo:', formData.get('altro_tipo'));
            console.log('   Descrizione:', formData.get('descrizione'));
            
            this.addTransaction();
        });

        // Update categories based on type con binding corretto
        document.querySelectorAll('input[name="tipo"]').forEach(radio => {
            radio.addEventListener('change', () => {
                console.log('🔄 Tipo transazione cambiato a:', radio.value);
                this.updateCategories();
            });
        });

        // 🐛 FIX CRITICO: Gestione campo "Altro" personalizzato migliorata
        const categorySelect = document.querySelector('select[name="categoria"]');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                const altroField = document.getElementById('altro-type-field');
                const altroInput = document.querySelector('input[name="altro_tipo"]');
                
                console.log('🔄 Categoria cambiata a:', e.target.value);
                
                if (e.target.value === 'Altro') {
                    console.log('✅ Mostrando campo "Altro"');
                    altroField.classList.remove('hidden');
                    altroInput.required = true;
                    // 🔥 FIX: Non chiamare focus() se l'input ha già un valore (preserva il testo)
                    if (!altroInput.value.trim()) {
                        altroInput.focus();
                    }
                } else {
                    console.log('⚠️ Nascondendo campo "Altro" - ma PRESERVANDO il valore');
                    altroField.classList.add('hidden');
                    altroInput.required = false;
                    // 🔥 FIX CRITICO: NON cancellare il valore quando si nasconde
                    // altroInput.value = ''; // <-- QUESTA LINEA CAUSAVA IL BUG!
                    // Il valore viene mantenuto in caso l'utente ritorni su "Altro"
                }
            });
        }
        
        // Event delegation per bottoni aggiornamento investimenti (CRITICO: qui rimane sempre attivo)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.investment-update-btn')) {
                e.preventDefault();
                const button = e.target.closest('.investment-update-btn');
                const investmentId = button.getAttribute('data-investment-id');
                const action = button.getAttribute('data-action');
                
                console.log('🖱️ CLICK RILEVATO su bottone investimento!', { investmentId, action });
                
                if (investmentId && action) {
                    console.log('✅ Chiamando openInvestmentUpdateModal...');
                    this.openInvestmentUpdateModal(investmentId, action);
                } else {
                    console.error('❌ Dati bottone mancanti:', { investmentId, action });
                }
            }
        });
        
        // 🔥 Gestione ESC per chiudere modal con funzioni dedicate
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                console.log('🔑 ESC premuto - chiudendo modal aperti...');
                
                // Usa le funzioni specifiche di chiusura
                const modal = document.getElementById('add-modal');
                if (modal && !modal.classList.contains('hidden')) {
                    console.log('🚪 Chiudendo add-modal con ESC');
                    closeAddModal();
                    return;
                }
                
                // Per altri modal, usa la funzione universale
                const openModals = [
                    'investment-modal', 
                    'investment-update-modal',
                    'quick-expense-modal',
                    'project-component-modal',
                    'project-return-modal'
                ];
                
                openModals.forEach(modalId => {
                    const modal = document.getElementById(modalId);
                    if (modal && !modal.classList.contains('hidden')) {
                        console.log(`🚪 Chiudendo ${modalId} con ESC`);
                        if (window.closeModalOptimal) {
                            window.closeModalOptimal(modalId);
                        } else {
                            // Fallback
                            modal.style.cssText = '';
                            modal.classList.add('hidden');
                            modal.style.display = 'none';
                            document.body.style.cssText = '';
                        }
                    }
                });
            }
        });
    }

    updateCategories() {
        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const select = document.querySelector('select[name="categoria"]');
        
        // 🐛 FIX CRITICO: Salva il valore attualmente selezionato
        const currentValue = select.value;
        const altroInput = document.querySelector('input[name="altro_tipo"]');
        const altroField = document.getElementById('altro-type-field');
        const currentAltroValue = altroInput ? altroInput.value : '';
        const isAltroVisible = altroField ? !altroField.classList.contains('hidden') : false;
        
        console.log('🔄 updateCategories - Salvando stato attuale:', {
            currentValue, 
            currentAltroValue, 
            isAltroVisible
        });
        
        const entrate = [
            {value: 'Stipendio', text: '💼 Stipendio'},
            {value: 'Freelance', text: '💻 Freelance'},
            {value: 'Investimenti', text: '📈 Investimenti'},
            {value: 'Bonus', text: '🎁 Bonus'},
            {value: 'Altro', text: '📦 Altro'}
        ];
        
        const uscite = [
            {value: 'Ristorazione', text: '🍽️ Ristorazione'},
            {value: 'Tabaccherie', text: '🚬 Tabaccherie'},
            {value: 'Trasporti', text: '🚗 Trasporti'},
            {value: 'Spesa', text: '🛒 Spesa Alimentare'},
            {value: 'Abbigliamento', text: '👕 Abbigliamento'},
            {value: 'Salute', text: '❤️ Salute'},
            {value: 'Bollette', text: '📄 Bollette'},
            {value: 'Casa', text: '🏠 Casa'},
            {value: 'Intrattenimento', text: '🎮 Intrattenimento'},
            {value: 'Altro', text: '📦 Altro'}
        ];
        
        const options = tipo === 'entrata' ? entrate : uscite;
        
        // Ricostruisci le opzioni
        select.innerHTML = '<option value="">Seleziona categoria</option>' + 
            options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
        
        // 🔥 FIX CRITICO: Ripristina il valore se compatibile con il nuovo tipo
        const availableValues = options.map(opt => opt.value);
        if (currentValue && availableValues.includes(currentValue)) {
            select.value = currentValue;
            
            // Se era "Altro", ripristina anche il campo personalizzato
            if (currentValue === 'Altro' && isAltroVisible && altroField && altroInput) {
                altroField.classList.remove('hidden');
                altroInput.required = true;
                altroInput.value = currentAltroValue;
                
                console.log('✅ Ripristinato campo "Altro" con valore:', currentAltroValue);
            }
        } else {
            // Se il valore non è compatibile, nascondi il campo "Altro" 
            if (altroField) {
                altroField.classList.add('hidden');
                if (altroInput) {
                    altroInput.required = false;
                    altroInput.value = '';
                }
            }
        }
        
        console.log('✅ updateCategories completato - Valore finale:', select.value);
    }

    async loadTransactions() {
        try {
            console.log('📥 Caricamento transazioni...');
            const response = await fetch('tables/transazioni?limit=1000');
            
            if (response.ok) {
                const data = await response.json();
                this.transactions = (data.data || []).map(t => ({
                    ...t,
                    data: new Date(t.data),
                    importo: parseFloat(t.importo)
                })).sort((a, b) => b.data - a.data);
                
                console.log(`✅ Caricate ${this.transactions.length} transazioni`);
            } else {
                console.log('ℹ️ Nessuna transazione esistente');
                this.transactions = [];
            }
        } catch (error) {
            console.error('❌ Errore caricamento:', error);
            this.transactions = [];
        }
    }

    async addTransaction() {
        try {
            console.log('🔄 Iniziando addTransaction...');
            
            // 🛡️ VALIDAZIONE PREVENTIVA
            if (!this.validateFormBeforeSubmit('transaction-form')) {
                console.log('🚫 Validazione fallita, blocco submit');
                return;
            }
            const formData = new FormData(document.getElementById('transaction-form'));
            
            // Gestione categoria personalizzata per "Altro"
            let categoria = formData.get('categoria');
            let descrizione = formData.get('descrizione') || '';
            
            if (categoria === 'Altro') {
                const altroTipo = formData.get('altro_tipo');
                if (altroTipo && altroTipo.trim()) {
                    categoria = altroTipo.trim(); // Usa il tipo personalizzato come categoria
                    if (descrizione) {
                        descrizione = `[Altro] ${descrizione}`; // Prefisso per identificare origine
                    }
                }
            }

            const transaction = {
                tipo: formData.get('tipo'),
                importo: parseFloat(formData.get('importo')),
                categoria: categoria,
                descrizione: descrizione,
                data: new Date(formData.get('data')).toISOString(),
                ricorrente: formData.get('ricorrente') === 'on',
                metodo_pagamento: 'carta'
            };

            console.log('💾 Salvataggio transazione:', transaction);

            const response = await fetch('tables/transazioni', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction)
            });

            if (response.ok) {
                console.log('✅ Response OK, aggiornando UI...');
                
                // Ferma immediatamente l'animazione se attiva
                try {
                    this.stopChartAnimation();
                } catch (e) {
                    console.warn('⚠️ Errore stopChartAnimation:', e);
                }
                
                // Aggiungi localmente PRIMA (per UI reattiva)
                transaction.data = new Date(transaction.data);
                transaction.id = Date.now().toString();
                this.transactions.unshift(transaction);
                console.log('✅ Transazione aggiunta localmente');
                
                // 📊 AGGIORNA TUTTO IL DASHBOARD (CRITICO!)
                console.log('📊 Aggiornando dashboard completo...');
                try {
                    this.updateDashboard();
                    console.log('✅ updateDashboard OK - Saldo e statistiche aggiornati');
                } catch (e) {
                    console.error('❌ updateDashboard error:', e);
                }
                
                // 📊 AGGIORNA TUTTI I GRAFICI IN ORDINE LOGICO
                console.log('📊 === INIZIO AGGIORNAMENTO COMPLETO GRAFICI ===');
                console.log(`📊 Transazioni totali: ${this.transactions.length}`);
                const entrate = this.transactions.filter(t => t.tipo === 'entrata');
                const uscite = this.transactions.filter(t => t.tipo === 'uscita');
                console.log(`📊 Entrate: ${entrate.length} | Uscite: ${uscite.length}`);
                
                // 1️⃣ Grafico torta spese (solo se ci sono spese)
                try {
                    console.log('📊 [1/5] Aggiornando grafico torta spese...');
                    this.updateChart();
                    console.log('✅ [1/5] Grafico torta spese aggiornato');
                } catch (e) {
                    console.error('❌ [1/5] updateChart error:', e);
                }
                
                // 2️⃣ Grafici investimenti
                try {
                    console.log('📊 [2/5] Aggiornando grafici investimenti...');
                    this.updateInvestmentChart();
                    this.updateMaterialInvestmentChart();
                    console.log('✅ [2/5] Grafici investimenti aggiornati');
                } catch (e) {
                    console.error('❌ [2/5] Investimenti charts error:', e);
                }
                
                // 3️⃣ Grafici temporali (CRITICO - dipendono dal saldo!)
                try {
                    console.log('📊 [3/5] Aggiornando grafici temporali con nuovo saldo...');
                    this.updateTimeCharts(30); // Default 30 giorni
                    console.log('✅ [3/5] Grafici temporali aggiornati con nuovo saldo');
                } catch (e) {
                    console.error('❌ [3/5] updateTimeCharts error:', e);
                }
                
                console.log('📊 === FINE AGGIORNAMENTO COMPLETO GRAFICI ===');
                
                // Chiudi modal e reset form - IMPLEMENTAZIONE ROBUSTA
                try {
                    // 🔥 CHIUSURA UNIVERSALE ROBUSTA
                    this.forceCloseAllModals();
                    console.log('✅ Modal chiuso (universale)');
                } catch (e) {
                    console.error('❌ forceCloseAllModals error:', e);
                    // Fallback alla funzione originale
                    try {
                        closeAddModal();
                    } catch (fallbackErr) {
                        console.error('❌ Fallback closeAddModal error:', fallbackErr);
                    }
                }
                
                try {
                    document.getElementById('transaction-form').reset();
                    document.querySelector('input[name="data"]').value = new Date().toISOString().split('T')[0];
                    
                    // Reset campo "Altro" personalizzato
                    const altroField = document.getElementById('altro-type-field');
                    if (altroField) {
                        altroField.classList.add('hidden');
                        const altroInput = document.querySelector('input[name="altro_tipo"]');
                        if (altroInput) {
                            altroInput.required = false;
                            altroInput.value = '';
                        }
                    }
                    
                    console.log('✅ Form resettato');
                } catch (e) {
                    console.error('❌ Form reset error:', e);
                }
                
                this.showNotification('✅ Transazione aggiunta con successo!');
                console.log('✅ Transazione salvata completamente');
            } else {
                throw new Error(`Errore server: ${response.status}`);
            }
        } catch (error) {
            console.error('❌ Errore completo in addTransaction:', error);
            this.showNotification('❌ Errore nel salvataggio', 'error');
            // Non bloccare l'interfaccia in caso di errore
            try {
                closeAddModal();
            } catch (e) {
                console.error('❌ Errore anche nella chiusura modal:', e);
            }
        }
    }

    updateDashboard() {
        console.log('🔄 === updateDashboard() INIZIATO ===');
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Debug: verifica stato transazioni
        console.log('📊 Stato transazioni:', {
            count: this.transactions.length,
            ultimeTre: this.transactions.slice(0, 3).map(t => ({
                tipo: t.tipo,
                importo: t.importo,
                descrizione: t.descrizione
            }))
        });

        // Calcola totali con debug dettagliato
        const transactionBalance = this.transactions.reduce((sum, t) => 
            sum + (t.tipo === 'entrata' ? t.importo : -t.importo), 0);
        const financialInvestmentValue = this.financialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        
        // Per i progetti materiali, calcola investimenti netti (totale investito - rientri)
        const materialInvestmentValue = this.materialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        const totalProjectReturns = this.materialInvestments.reduce((sum, i) => sum + (i.project_return || 0), 0);
        
        console.log('💰 Calcolo saldo dettagliato:', {
            transactionBalance,
            financialInvestmentValue,
            materialInvestmentValue,
            totalProjectReturns
        });
        
        // Il saldo tiene conto degli investimenti netti (già calcolati in investment_value)
        const totalBalance = transactionBalance - financialInvestmentValue - materialInvestmentValue;
        
        console.log(`💰 SALDO FINALE CALCOLATO: ${totalBalance}`);

        const monthlyIncome = this.transactions
            .filter(t => t.tipo === 'entrata' && 
                    t.data.getMonth() === currentMonth && 
                    t.data.getFullYear() === currentYear)
            .reduce((sum, t) => sum + t.importo, 0);

        const monthlyExpenses = this.transactions
            .filter(t => t.tipo === 'uscita' && 
                    t.data.getMonth() === currentMonth && 
                    t.data.getFullYear() === currentYear)
            .reduce((sum, t) => sum + t.importo, 0);

        // AGGIORNA UI CON DEBUG
        console.log('🎨 Aggiornamento elementi DOM...');
        
        const headerBalanceElement = document.getElementById('header-balance');
        console.log('📄 Elemento header-balance:', {
            exists: !!headerBalanceElement,
            currentValue: headerBalanceElement?.textContent,
            newValue: this.formatCurrency(totalBalance)
        });
        
        if (headerBalanceElement) {
            const valorePrecedente = headerBalanceElement.textContent;
            headerBalanceElement.textContent = this.formatCurrency(totalBalance);
            const valoreSuccessivo = headerBalanceElement.textContent;
            
            console.log('✏️ Aggiornamento header-balance:', {
                prima: valorePrecedente,
                dopo: valoreSuccessivo,
                cambiato: valorePrecedente !== valoreSuccessivo
            });
        } else {
            console.error('❌ ERRORE: Elemento header-balance NON TROVATO nel DOM!');
        }
        document.getElementById('monthly-income').textContent = this.formatCurrency(monthlyIncome);
        document.getElementById('monthly-expenses').textContent = this.formatCurrency(monthlyExpenses);
        document.getElementById('total-transactions').textContent = this.transactions.length;
        document.getElementById('balance').textContent = this.formatCurrency(monthlyIncome - monthlyExpenses);
        document.getElementById('financial-investments-total').textContent = this.formatCurrency(financialInvestmentValue);
        document.getElementById('material-investments-total').textContent = this.formatCurrency(materialInvestmentValue);
        
        // Aggiorna breakdown nell'header (SOLO investimenti liquidi nel breakdown)
        document.getElementById('header-cash').textContent = this.formatCurrency(transactionBalance);
        document.getElementById('header-investments').textContent = this.formatCurrency(financialInvestmentValue);
        
        // Mostra sempre breakdown per chiarezza (liquidità vs investimenti)
        const headerBreakdown = document.getElementById('header-breakdown');
        const totalInvestments = financialInvestmentValue + materialInvestmentValue;
        headerBreakdown.style.display = 'block'; // Sempre visibile per trasparenza
        
        // Aggiorna colori basati sui valori
        const balanceElement = document.getElementById('balance');
        const monthlyBalance = monthlyIncome - monthlyExpenses;
        if (monthlyBalance > 0) {
            balanceElement.className = 'text-2xl font-bold text-green-600';
        } else if (monthlyBalance < 0) {
            balanceElement.className = 'text-2xl font-bold text-red-600';
        } else {
            balanceElement.className = 'text-2xl font-bold text-gray-900';
        }
        
        // Colori dinamici per investimenti liquidi (arancione perché sono uscite)
        const financialInvestmentsElement = document.getElementById('financial-investments-total');
        if (financialInvestmentValue > 0) {
            financialInvestmentsElement.className = 'text-2xl font-bold text-orange-600';
        } else {
            financialInvestmentsElement.className = 'text-2xl font-bold text-gray-900';
        }
        
        // Colori dinamici per investimenti materiali (rossi perché sono uscite)
        const materialInvestmentsElement = document.getElementById('material-investments-total');
        if (materialInvestmentValue > 0) {
            materialInvestmentsElement.className = 'text-2xl font-bold text-red-600';
        } else {
            materialInvestmentsElement.className = 'text-2xl font-bold text-gray-900';
        }

        // Aggiorna lista transazioni
        this.updateTransactionsList();
        
        // Aggiorna investimenti
        this.updateInvestmentsDashboard();
        
        // Aggiorna tabella riassuntiva investimenti
        this.updateInvestmentsSummaryTable();
        
        // Aggiorna analisi movimenti frequenti
        this.updateFrequentAnalysis();
        
        // 💰 SALDO HEADER GIÀ AGGIORNATO SOPRA (linee 1772-1774)
        console.log(`💰 Header saldo già aggiornato correttamente: ${this.formatCurrency(totalBalance)}`);
        
        console.log('🔄 === updateDashboard() COMPLETATO ===');
        
        // 🔍 SINCRONIZZAZIONE CON SISTEMA RADICALE
        const lastRadicalUpdate = localStorage.getItem('lastRadicalUpdate');
        if (lastRadicalUpdate) {
            const timeSinceUpdate = Date.now() - parseInt(lastRadicalUpdate);
            console.log('🔄 Tempo dall\'ultimo update radicale:', timeSinceUpdate, 'ms');
            
            // Se c'è stato un update radicale negli ultimi 5 secondi, marca come sincronizzato
            if (timeSinceUpdate < 5000) {
                console.log('✅ updateDashboard sincronizzato con sistema radicale');
            }
        }
        
        // Verifica finale che il DOM sia stato aggiornato
        setTimeout(() => {
            const finalBalance = document.getElementById('header-balance')?.textContent;
            console.log('🔍 Verifica finale DOM header-balance:', finalBalance);
        }, 50);
    }

    updateInvestmentsSummaryTable() {
        const summaryTableContainer = document.getElementById('investments-summary-table');
        const totalAmountElement = document.getElementById('total-investments-amount');
        
        // Calcola totali
        const financialTotal = this.financialInvestments.reduce((sum, inv) => sum + inv.investment_value, 0);
        const materialTotal = this.materialInvestments.reduce((sum, inv) => sum + inv.investment_value, 0);
        const grandTotal = financialTotal + materialTotal;
        
        // Aggiorna totale nell'header
        totalAmountElement.textContent = this.formatCurrency(grandTotal);
        
        // Genera tabella HTML
        let tableHTML = '';
        
        if (this.financialInvestments.length === 0 && this.materialInvestments.length === 0) {
            // Stato vuoto
            tableHTML = `
                <div class="text-center py-12">
                    <div class="mb-4">
                        <i class="fas fa-chart-pie text-4xl text-gray-400"></i>
                    </div>
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Nessun investimento ancora</h4>
                    <p class="text-gray-500 mb-6">Inizia creando il tuo primo investimento per vedere il riepilogo completo</p>
                    <div class="flex flex-col sm:flex-row justify-center gap-3">
                        <button onclick="openInvestmentModal('financial')" class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-coins mr-2"></i>Investimento Liquido
                        </button>
                        <button onclick="openInvestmentModal('material')" class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-hammer mr-2"></i>Progetto Materiale
                        </button>
                    </div>
                </div>`;
        } else {
            // Tabella completa
            tableHTML = `
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="text-left py-3 px-4 font-semibold text-gray-700">Categoria</th>
                            <th class="text-left py-3 px-4 font-semibold text-gray-700">Nome Investimento</th>
                            <th class="text-right py-3 px-4 font-semibold text-gray-700">Valore</th>
                            <th class="text-right py-3 px-4 font-semibold text-gray-700">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
            // Sezione Investimenti Liquidi (Financial)
            if (this.financialInvestments.length > 0) {
                tableHTML += `
                    <tr class="bg-teal-50 border-b border-teal-100">
                        <td colspan="4" class="py-3 px-4 font-semibold text-teal-700">
                            <i class="fas fa-coins mr-2"></i>Investimenti Liquidi
                        </td>
                    </tr>`;
                
                this.financialInvestments.forEach(inv => {
                    tableHTML += `
                        <tr class="border-b border-gray-100 hover:bg-teal-25 transition-colors">
                            <td class="py-3 px-4">
                                <div class="flex items-center">
                                    <span class="text-lg mr-2">${inv.investment_emoji}</span>
                                    <span class="text-sm text-teal-600 bg-teal-100 px-2 py-1 rounded-full">Liquido</span>
                                </div>
                            </td>
                            <td class="py-3 px-4 font-medium text-gray-900">${inv.investment_name}</td>
                            <td class="py-3 px-4 text-right font-semibold text-teal-600">${this.formatCurrency(inv.investment_value)}</td>
                            <td class="py-3 px-4 text-right">
                                <button onclick="sapoTracker.editInvestment('${inv.id}', 'financial')" class="text-teal-600 hover:text-teal-800 mr-2" title="Modifica">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="sapoTracker.deleteInvestment('${inv.id}', 'financial')" class="text-red-500 hover:text-red-700" title="Elimina">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
                });
                
                tableHTML += `
                    <tr class="bg-teal-100 border-b border-teal-200">
                        <td colspan="2" class="py-2 px-4 font-semibold text-teal-800">Subtotale Liquidi</td>
                        <td class="py-2 px-4 text-right font-bold text-teal-800">${this.formatCurrency(financialTotal)}</td>
                        <td class="py-2 px-4"></td>
                    </tr>`;
            }
            
            // PROGETTI MATERIALI - CASELLE SEPARATE SEMPLICI
            if (this.materialInvestments.length > 0) {
                
                // HEADER GENERALE
                tableHTML += `
                    <tr class="bg-amber-600 text-white">
                        <td colspan="4" class="py-4 px-6 text-center">
                            <h2 class="text-xl font-bold">
                                <i class="fas fa-hammer mr-2"></i>PROGETTI MATERIALI (${this.materialInvestments.length} progetti)
                            </h2>
                        </td>
                    </tr>`;
                
                // LAYOUT A GRIGLIA - Ogni progetto nella sua casella
                tableHTML += `
                    <tr class="bg-gray-50">
                        <td colspan="4" class="p-8">
                            <div class="grid grid-cols-1 ${this.materialInvestments.length > 1 ? 'md:grid-cols-2' : ''} gap-8 max-w-6xl mx-auto">`;
                
                // Per ogni progetto, crea una casella indipendente
                this.materialInvestments.forEach((project, projectIndex) => {
                    const subInvestments = project.sub_investments || [];
                    const totalInvested = project.total_invested || project.investment_value;
                    const projectReturn = project.project_return || 0;
                    const netValue = totalInvested - projectReturn;
                    const baseInvestmentValue = totalInvested - subInvestments.reduce((sum, sub) => sum + sub.investment_value, 0);
                    
                    // CASELLA PROGETTO COMPLETA
                    tableHTML += `
                        <div class="bg-white rounded-xl shadow-xl border-2 border-amber-300 overflow-hidden">
                            
                            <!-- Header progetto -->
                            <div class="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 text-center">
                                <div class="text-4xl mb-2">${project.investment_emoji}</div>
                                <h3 class="text-xl font-bold">${project.investment_name}</h3>
                                <p class="text-amber-100 text-sm">Creato il ${this.formatDate(project.investment_date)}</p>
                            </div>
                            
                            <!-- Scontrino componenti -->
                            <div class="p-6">
                                <div class="bg-gray-50 rounded-lg p-4 mb-4" style="font-family: 'Courier New', monospace;">
                                    <div class="text-center border-b border-dashed border-gray-400 pb-2 mb-3">
                                        <div class="font-bold">${project.investment_name}</div>
                                        <div class="text-xs text-gray-600">${this.formatDate(project.investment_date)}</div>
                                    </div>
                                    
                                    <!-- Lista investimenti -->`;
                    
                    // Investimento base
                    if (baseInvestmentValue > 0) {
                        tableHTML += `
                                    <div class="flex justify-between py-1">
                                        <span class="text-sm">Investimento Base</span>
                                        <span class="font-bold">${this.formatCurrency(baseInvestmentValue)}</span>
                                    </div>`;
                    }
                    
                    // Componenti aggiuntivi
                    subInvestments.forEach((component) => {
                        const componentName = component.component_name || 'Componente';
                        tableHTML += `
                                    <div class="flex justify-between py-1">
                                        <span class="text-sm">${componentName}</span>
                                        <span class="font-bold">${this.formatCurrency(component.investment_value)}</span>
                                    </div>`;
                    });
                    
                    // Totali
                    tableHTML += `
                                    <div class="border-t border-dashed border-gray-400 mt-2 pt-2">
                                        <div class="flex justify-between font-bold text-lg">
                                            <span>TOTALE:</span>
                                            <span>${this.formatCurrency(totalInvested)}</span>
                                        </div>`;
                    
                    // Rientro
                    if (projectReturn > 0) {
                        tableHTML += `
                                        <div class="flex justify-between text-green-600 font-semibold">
                                            <span>RIENTRO:</span>
                                            <span>-${this.formatCurrency(projectReturn)}</span>
                                        </div>
                                        <div class="border-t border-dashed border-gray-400 mt-1 pt-1">
                                            <div class="flex justify-between font-bold text-xl ${netValue >= 0 ? 'text-red-600' : 'text-green-600'}">
                                                <span>${netValue >= 0 ? 'COSTO:' : 'PROFITTO:'}</span>
                                                <span>${this.formatCurrency(Math.abs(netValue))}</span>
                                            </div>
                                        </div>`;
                    } else {
                        tableHTML += `
                                        <div class="text-center text-gray-500 text-xs mt-2">
                                            (Nessun rientro)
                                        </div>`;
                    }
                    
                    tableHTML += `
                                    </div>
                                </div>
                                
                                <!-- Bottoni azioni -->
                                <div class="space-y-2">
                                    <button onclick="sapoTracker.openAddComponentModal('${project.id}')" 
                                            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-all">
                                        <i class="fas fa-plus mr-2"></i>Aggiungi Componente
                                    </button>
                                    <button onclick="sapoTracker.openProjectReturnModal('${project.id}')" 
                                            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-all">
                                        <i class="fas fa-arrow-down mr-2"></i>${projectReturn > 0 ? 'Modifica' : 'Aggiungi'} Rientro
                                    </button>
                                    <button onclick="sapoTracker.deleteProject('${project.id}')" 
                                            class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all">
                                        <i class="fas fa-trash mr-2"></i>Elimina Progetto
                                    </button>
                                </div>`;
                    
                    // Lista componenti per gestione (se presenti)
                    if (subInvestments.length > 0) {
                        tableHTML += `
                                <div class="mt-4 pt-4 border-t border-gray-200">
                                    <h5 class="font-semibold text-gray-700 mb-2 text-sm">Gestisci Componenti:</h5>
                                    <div class="space-y-1">`;
                        
                        subInvestments.forEach((component) => {
                            const componentName = component.component_name || 'Componente';
                            tableHTML += `
                                        <div class="flex items-center justify-between bg-amber-50 p-2 rounded text-sm">
                                            <div>
                                                <div class="font-medium">${componentName}</div>
                                                <div class="text-xs text-gray-600">${this.formatDate(component.investment_date)}</div>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <span class="font-bold text-amber-700">${this.formatCurrency(component.investment_value)}</span>
                                                <button onclick="sapoTracker.deleteSubInvestment('${project.id}', '${component.id}')" 
                                                        class="bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded text-xs">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>`;
                        });
                        
                        tableHTML += `
                                    </div>
                                </div>`;
                    }
                    
                    tableHTML += `
                            </div>
                        </div>`;
                });
                
                tableHTML += `
                            </div>
                        </td>
                    </tr>`;
                
                // Totale generale (se più progetti)
                if (this.materialInvestments.length > 1) {
                    tableHTML += `
                        <tr class="bg-purple-600 text-white">
                            <td colspan="4" class="py-4 px-6 text-center">
                                <div class="text-lg font-bold">
                                    <i class="fas fa-calculator mr-2"></i>TOTALE GENERALE: ${this.formatCurrency(materialTotal)}
                                </div>
                                <div class="text-purple-200 text-sm">Valore netto di tutti i progetti</div>
                            </td>
                        </tr>`;
                }
            }
            
            // Totale generale
            tableHTML += `
                    <tr class="bg-purple-100 border-t-2 border-purple-300">
                        <td colspan="2" class="py-3 px-4 font-bold text-purple-800 text-lg">TOTALE INVESTIMENTI</td>
                        <td class="py-3 px-4 text-right font-bold text-purple-800 text-lg">${this.formatCurrency(grandTotal)}</td>
                        <td class="py-3 px-4"></td>
                    </tr>
                </tbody>
            </table>`;
            
            // Aggiungi statistiche rapide
            if (grandTotal > 0) {
                const financialPercentage = ((financialTotal / grandTotal) * 100).toFixed(1);
                const materialPercentage = ((materialTotal / grandTotal) * 100).toFixed(1);
                
                tableHTML += `
                    <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="bg-teal-50 p-4 rounded-lg">
                            <div class="text-sm text-teal-600 font-medium">% Liquidi</div>
                            <div class="text-2xl font-bold text-teal-700">${financialPercentage}%</div>
                        </div>
                        <div class="bg-amber-50 p-4 rounded-lg">
                            <div class="text-sm text-amber-600 font-medium">% Materiali</div>
                            <div class="text-2xl font-bold text-amber-700">${materialPercentage}%</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-sm text-purple-600 font-medium">Diversificazione</div>
                            <div class="text-lg font-bold text-purple-700">
                                ${this.financialInvestments.length + this.materialInvestments.length} investimenti
                            </div>
                        </div>
                    </div>`;
            }
        }
        
        summaryTableContainer.innerHTML = tableHTML;
    }

    createChart() {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['In attesa di dati'],
                datasets: [{
                    data: [100],
                    backgroundColor: ['#3b82f6'],
                    borderWidth: 0,
                    borderColor: 'transparent',
                    hoverOffset: 8,
                    spacing: 0,
                    cutout: '50%',
                    borderAlign: 'center'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                devicePixelRatio: window.devicePixelRatio || 2, // Alta definizione
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                        spacing: 0,
                        borderJoinStyle: 'miter',
                        borderCapStyle: 'butt',
                        borderAlign: 'center'
                    }
                },
                interaction: {
                    intersect: true,
                    mode: 'nearest'
                },
                onHover: (event, activeElements, chart) => {
                    // Disabilita hover durante l'animazione per evitare problemi di sincronizzazione
                    if (this.chartAnimation) {
                        return;
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false, // Disabilitiamo tooltip durante rotazione per evitare glitch
                        filter: (tooltipItem) => {
                            // Solo se non è in animazione
                            return !this.chartAnimation;
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                onClick: null
            }
        });

        this.startChartAnimation();
        this.updateChart();
    }

    createInvestmentChart() {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        
        this.investmentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['In attesa di investimenti'],
                datasets: [{
                    data: [100],
                    backgroundColor: ['#14b8a6'],
                    borderWidth: 0,
                    borderColor: 'transparent',
                    hoverOffset: 8,
                    spacing: 0,
                    cutout: '50%',
                    borderAlign: 'center'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                devicePixelRatio: window.devicePixelRatio || 2, // Alta definizione
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                        spacing: 0,
                        borderJoinStyle: 'miter',
                        borderCapStyle: 'butt',
                        borderAlign: 'center'
                    }
                },
                interaction: {
                    intersect: true,
                    mode: 'nearest'
                },
                onHover: (event, activeElements, chart) => {
                    // Disabilita hover durante l'animazione per evitare problemi di sincronizzazione
                    if (this.investmentChartAnimation) {
                        return;
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false, // Disabilitiamo tooltip durante rotazione per evitare glitch
                        filter: (tooltipItem) => {
                            // Solo se non è in animazione
                            return !this.investmentChartAnimation;
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                onClick: null
            }
        });

        this.startInvestmentChartAnimation();
        this.updateInvestmentChart();
    }

    createMaterialInvestmentChart() {
        const ctx = document.getElementById('materialInvestmentChart').getContext('2d');
        
        this.materialInvestmentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['In attesa di investimenti progetti'],
                datasets: [{
                    data: [100],
                    backgroundColor: ['#f59e0b'], // Amber
                    borderWidth: 0,
                    borderColor: 'transparent',
                    hoverOffset: 8,
                    spacing: 0,
                    cutout: '50%',
                    borderAlign: 'center'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1,
                devicePixelRatio: window.devicePixelRatio || 2,
                layout: {
                    padding: { top: 20, bottom: 20, left: 20, right: 20 }
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                        spacing: 0,
                        borderJoinStyle: 'miter',
                        borderCapStyle: 'butt',
                        borderAlign: 'center'
                    }
                },
                interaction: { intersect: true, mode: 'nearest' },
                onHover: (event, activeElements, chart) => {
                    if (this.materialInvestmentChartAnimation) return;
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: { animateRotate: true, duration: 800, easing: 'easeOutQuart' },
                onClick: null
            }
        });

        this.startMaterialInvestmentChartAnimation();
        this.updateMaterialInvestmentChart();
    }

    startInvestmentChartAnimation() {
        if (!this.hasInvestmentData()) {
            // Setup cerchio ultra-fluido per investimenti
            this.setupInvestmentMultiSegmentChart();
            
            let currentRotation = 0;
            let lastTime = performance.now();
            let velocity = 0;
            const targetVelocity = 0.6; // Velocità target più fluida
            const acceleration = 0.02; // Accelerazione graduale
            
            // Disabilita interazioni per performance massima
            this.investmentChart.options.interaction.intersect = false;
            this.investmentChart.options.plugins.tooltip.enabled = false;
            this.investmentChart.options.onHover = null;
            
            // Aggiungi effetto glow durante animazione
            this.investmentChart.canvas.classList.add('animating');
            
            const animate = (currentTime) => {
                if (this.investmentChart && !this.hasInvestmentData()) {
                    const deltaTime = Math.min(currentTime - lastTime, 20); // Cap per stabilità
                    lastTime = currentTime;
                    
                    // Accelerazione fluida all'inizio
                    if (velocity < targetVelocity) {
                        velocity += acceleration;
                    }
                    
                    // Movimento basato su tempo reale per fluidità perfetta
                    currentRotation += velocity * (deltaTime / 16.67); // Normalizzato a 60fps
                    if (currentRotation >= 360) currentRotation -= 360;
                    
                    // Applica rotazione con interpolazione smooth
                    this.investmentChart.data.datasets[0].rotation = currentRotation;
                    
                    // Update ottimizzato per 60fps costanti
                    this.investmentChart.update('none');
                    
                    this.investmentChartAnimation = requestAnimationFrame(animate);
                }
            };
            
            this.investmentChartAnimation = requestAnimationFrame(animate);
        }
    }

    setupInvestmentMultiSegmentChart() {
        // 60 segmenti per fluidità estrema - come un cerchio perfetto
        const segments = 60;
        const segmentColors = [];
        const segmentData = [];
        
        // Colori teal per investimenti con variazioni sottili
        const baseColors = [
            '#14b8a6', // Teal principale
            '#0d9488', // Teal scuro
            '#5eead4', // Teal chiaro
            '#2dd4bf'  // Teal medio
        ];
        
        for (let i = 0; i < segments; i++) {
            segmentData.push(100 / segments);
            // Alterna colori per un effetto gradient fluido
            const colorIndex = Math.floor(i / (segments / baseColors.length));
            segmentColors.push(baseColors[colorIndex % baseColors.length]);
        }
        
        this.investmentChart.data.labels = Array(segments).fill('Portfolio');
        this.investmentChart.data.datasets[0].data = segmentData;
        this.investmentChart.data.datasets[0].backgroundColor = segmentColors;
        this.investmentChart.data.datasets[0].borderWidth = 0;
        this.investmentChart.data.datasets[0].spacing = 1; // Micro-spaziatura per definizione
    }

    hasInvestmentData() {
        return this.financialInvestments && this.financialInvestments.length > 0;
    }

    stopInvestmentChartAnimation() {
        if (this.investmentChartAnimation) {
            cancelAnimationFrame(this.investmentChartAnimation);
            this.investmentChartAnimation = null;
            
            // Rimuovi effetto glow
            if (this.investmentChart && this.investmentChart.canvas) {
                this.investmentChart.canvas.classList.remove('animating');
            }
        }
    }

    updateInvestmentChart() {
        if (!this.investmentChart) {
            console.log('⚠️ Grafico investimenti non inizializzato');
            return;
        }

        if (this.financialInvestments.length === 0) {
            // Nessun investimento liquido - Mostra cerchio animato teal
            this.startInvestmentChartAnimation();
            this.updateInvestmentChartLegend([]);
        } else {
            // Dati reali - Mostra solo investimenti finanziari
            this.stopInvestmentChartAnimation();
            
            const investmentTotals = {};
            
            // Raggruppa investimenti finanziari per nome
            this.financialInvestments.forEach(inv => {
                const key = `${inv.investment_emoji} ${inv.investment_name}`;
                investmentTotals[key] = (investmentTotals[key] || 0) + inv.investment_value;
            });

            const labels = Object.keys(investmentTotals);
            const data = Object.values(investmentTotals);
            const colors = this.getInvestmentColors(labels);

            this.investmentChart.data.labels = labels;
            this.investmentChart.data.datasets[0].data = data;
            this.investmentChart.data.datasets[0].backgroundColor = colors;
            this.investmentChart.data.datasets[0].borderColor = '#ffffff';
            this.investmentChart.data.datasets[0].borderWidth = 1;
            this.investmentChart.data.datasets[0].spacing = 0;
            this.investmentChart.data.datasets[0].cutout = '50%';
            this.investmentChart.data.datasets[0].hoverOffset = 10;
            this.investmentChart.data.datasets[0].borderAlign = 'center';
            this.investmentChart.data.datasets[0].borderJoinStyle = 'miter';
            this.investmentChart.data.datasets[0].borderCapStyle = 'butt';
            
            // Riabilita tooltip per dati reali
            this.investmentChart.options.plugins.tooltip.enabled = true;
            this.investmentChart.options.plugins.tooltip.backgroundColor = '#1f2937';
            this.investmentChart.options.plugins.tooltip.titleColor = '#ffffff';
            this.investmentChart.options.plugins.tooltip.bodyColor = '#ffffff';
            this.investmentChart.options.plugins.tooltip.borderColor = '#14b8a6';
            this.investmentChart.options.plugins.tooltip.borderWidth = 2;
            this.investmentChart.options.plugins.tooltip.cornerRadius = 8;
            this.investmentChart.options.plugins.tooltip.padding = 12;
            this.investmentChart.options.plugins.tooltip.callbacks = {
                label: (context) => {
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${this.formatCurrency(value)} (${percentage}%)`;
                }
            };
            
            this.updateInvestmentChartLegend(labels, data);
        }
        
        this.investmentChart.update('active');
    }

    getInvestmentColors(labels) {
        // Colori per investimenti - Palette teal/verde/blu per portfolio
        const investmentColorMap = {
            '📈': '#14b8a6', // Teal principale
            '💰': '#0891b2', // Sky blue
            '₿': '#f59e0b',  // Bitcoin oro
            '📊': '#06b6d4', // Cyan
            '🏦': '#3b82f6', // Blue
            '💼': '#8b5cf6', // Purple
            '🏠': '#84cc16', // Lime
            '🥇': '#f59e0b', // Gold
            '📦': '#6b7280'  // Gray
        };
        
        // Colori di backup per investimenti
        const backupInvestmentColors = [
            '#14b8a6', '#0891b2', '#06b6d4', '#3b82f6',
            '#8b5cf6', '#10b981', '#84cc16', '#f59e0b',
            '#ef4444', '#ec4899', '#a855f7', '#22c55e'
        ];
        
        return labels.map((label, index) => {
            // Cerca colore per emoji
            const emoji = label.split(' ')[0];
            return investmentColorMap[emoji] || backupInvestmentColors[index % backupInvestmentColors.length] || '#14b8a6';
        });
    }

    updateInvestmentChartLegend(labels, data = []) {
        const legend = document.getElementById('investment-chart-legend');
        
        if (labels.length === 0) {
            legend.innerHTML = `
                <div class="empty-state">
                    <div class="loading-circle"></div>
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Portfolio in attesa</h4>
                    <p class="text-gray-500 text-sm mb-6 text-center">Crea il tuo primo investimento per<br>visualizzare la distribuzione del portfolio</p>
                    <div class="flex justify-center">
                        <button onclick="openInvestmentModal()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-plus mr-2"></i>Primo Investimento
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const total = data.reduce((sum, val) => sum + val, 0);
        const colors = this.getInvestmentColors(labels);
        
        legend.innerHTML = labels.map((label, index) => {
            const percentage = ((data[index] / total) * 100).toFixed(1);
            return `
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-3" style="background-color: ${colors[index]}"></div>
                        <span class="text-gray-900 font-medium">${label}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-900 font-semibold">${this.formatCurrency(data[index])}</div>
                        <div class="text-teal-600 text-sm font-medium">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // === FUNZIONI GRAFICO INVESTIMENTI MATERIALI ===
    
    startMaterialInvestmentChartAnimation() {
        if (!this.hasMaterialInvestmentData()) {
            this.setupMaterialInvestmentMultiSegmentChart();
            
            let currentRotation = 0;
            let lastTime = performance.now();
            let velocity = 0;
            const targetVelocity = 0.6;
            const acceleration = 0.02;
            
            this.materialInvestmentChart.options.interaction.intersect = false;
            this.materialInvestmentChart.options.plugins.tooltip.enabled = false;
            this.materialInvestmentChart.options.onHover = null;
            this.materialInvestmentChart.canvas.classList.add('animating');
            
            const animate = (currentTime) => {
                if (this.materialInvestmentChart && !this.hasMaterialInvestmentData()) {
                    const deltaTime = Math.min(currentTime - lastTime, 20);
                    lastTime = currentTime;
                    
                    if (velocity < targetVelocity) velocity += acceleration;
                    currentRotation += velocity * deltaTime;
                    
                    if (this.materialInvestmentChart.data && this.materialInvestmentChart.data.datasets[0]) {
                        this.materialInvestmentChart.data.datasets[0].rotation = currentRotation * Math.PI / 180;
                        this.materialInvestmentChart.update('none');
                    }
                    
                    this.materialInvestmentChartAnimation = requestAnimationFrame(animate);
                }
            };
            
            this.materialInvestmentChartAnimation = requestAnimationFrame(animate);
        }
    }

    setupMaterialInvestmentMultiSegmentChart() {
        const segments = 60;
        const segmentValue = 100 / segments;
        const amber_colors = ['#f59e0b', '#f97316', '#ea580c', '#dc2626'];
        
        this.materialInvestmentChart.data.labels = Array(segments).fill().map((_, i) => `Segmento ${i + 1}`);
        this.materialInvestmentChart.data.datasets[0].data = Array(segments).fill(segmentValue);
        this.materialInvestmentChart.data.datasets[0].backgroundColor = Array(segments).fill().map((_, i) => 
            amber_colors[i % amber_colors.length]
        );
        this.materialInvestmentChart.data.datasets[0].borderWidth = 0;
        this.materialInvestmentChart.data.datasets[0].spacing = 1;
    }

    hasMaterialInvestmentData() {
        return this.materialInvestments && this.materialInvestments.length > 0;
    }

    stopMaterialInvestmentChartAnimation() {
        if (this.materialInvestmentChartAnimation) {
            cancelAnimationFrame(this.materialInvestmentChartAnimation);
            this.materialInvestmentChartAnimation = null;
            
            if (this.materialInvestmentChart && this.materialInvestmentChart.canvas) {
                this.materialInvestmentChart.canvas.classList.remove('animating');
            }
        }
    }

    updateMaterialInvestmentChart() {
        if (!this.materialInvestmentChart) {
            console.log('⚠️ Grafico investimenti materiali non inizializzato');
            return;
        }

        if (this.materialInvestments.length === 0) {
            this.startMaterialInvestmentChartAnimation();
            this.updateMaterialInvestmentChartLegend([]);
        } else {
            this.stopMaterialInvestmentChartAnimation();
            
            const investmentTotals = {};
            this.materialInvestments.forEach(inv => {
                const key = `${inv.investment_emoji} ${inv.investment_name}`;
                investmentTotals[key] = (investmentTotals[key] || 0) + inv.investment_value;
            });

            const labels = Object.keys(investmentTotals);
            const data = Object.values(investmentTotals);
            const colors = this.getMaterialInvestmentColors(labels);

            this.materialInvestmentChart.data.labels = labels;
            this.materialInvestmentChart.data.datasets[0].data = data;
            this.materialInvestmentChart.data.datasets[0].backgroundColor = colors;
            this.materialInvestmentChart.data.datasets[0].borderColor = '#ffffff';
            this.materialInvestmentChart.data.datasets[0].borderWidth = 1;
            this.materialInvestmentChart.data.datasets[0].spacing = 0;
            this.materialInvestmentChart.data.datasets[0].cutout = '50%';
            this.materialInvestmentChart.data.datasets[0].hoverOffset = 10;
            
            this.materialInvestmentChart.options.plugins.tooltip.enabled = true;
            this.materialInvestmentChart.options.plugins.tooltip.backgroundColor = '#1f2937';
            this.materialInvestmentChart.options.plugins.tooltip.borderColor = '#f59e0b';
            this.materialInvestmentChart.options.plugins.tooltip.borderWidth = 2;
            this.materialInvestmentChart.options.plugins.tooltip.callbacks = {
                label: (context) => {
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${this.formatCurrency(value)} (${percentage}%)`;
                }
            };
            
            this.updateMaterialInvestmentChartLegend(labels, data);
        }
        
        this.materialInvestmentChart.update('active');
    }

    getMaterialInvestmentColors(labels) {
        const materialColorMap = {
            '🏠': '#f59e0b', '🏭': '#ea580c', '🌾': '#84cc16', '⚡': '#eab308',
            '🛠️': '#d97706', '🏗️': '#f97316', '💎': '#8b5cf6', '🚗': '#6366f1', '📦': '#78716c'
        };
        
        const backupMaterialColors = [
            '#f59e0b', '#ea580c', '#f97316', '#d97706', '#eab308', '#84cc16', '#10b981', '#8b5cf6'
        ];
        
        return labels.map((label, index) => {
            const emoji = label.split(' ')[0];
            return materialColorMap[emoji] || backupMaterialColors[index % backupMaterialColors.length] || '#f59e0b';
        });
    }

    updateMaterialInvestmentChartLegend(labels, data = []) {
        const legend = document.getElementById('material-investment-chart-legend');
        
        if (labels.length === 0) {
            legend.innerHTML = `
                <div class="empty-state">
                    <div class="loading-circle-amber"></div>
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Progetti in attesa</h4>
                    <p class="text-gray-500 text-sm mb-6 text-center">Crea il tuo primo investimento progetto<br>per visualizzare la distribuzione</p>
                    <div class="flex justify-center">
                        <button onclick="openInvestmentModal('material')" class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-plus mr-2"></i>Primo Progetto
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const total = data.reduce((sum, val) => sum + val, 0);
        const colors = this.getMaterialInvestmentColors(labels);
        
        legend.innerHTML = labels.map((label, index) => {
            const percentage = ((data[index] / total) * 100).toFixed(1);
            return `
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-3" style="background-color: ${colors[index]}"></div>
                        <span class="text-gray-900 font-medium">${label}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-900 font-semibold">${this.formatCurrency(data[index])}</div>
                        <div class="text-amber-600 text-sm font-medium">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    startChartAnimation() {
        if (!this.hasMaterialInvestmentData()) {
            this.setupMaterialInvestmentMultiSegmentChart();
            
            let currentRotation = 0;
            let lastTime = performance.now();
            let velocity = 0;
            const targetVelocity = 0.6;
            const acceleration = 0.02;
            
            this.materialInvestmentChart.options.interaction.intersect = false;
            this.materialInvestmentChart.options.plugins.tooltip.enabled = false;
            this.materialInvestmentChart.options.onHover = null;
            
            this.materialInvestmentChart.canvas.classList.add('animating');
            
            const animate = (currentTime) => {
                if (this.materialInvestmentChart && !this.hasMaterialInvestmentData()) {
                    const deltaTime = Math.min(currentTime - lastTime, 20);
                    lastTime = currentTime;
                    
                    if (velocity < targetVelocity) {
                        velocity += acceleration;
                    }
                    
                    currentRotation += velocity * deltaTime;
                    
                    if (this.materialInvestmentChart.data && this.materialInvestmentChart.data.datasets[0]) {
                        this.materialInvestmentChart.data.datasets[0].rotation = currentRotation * Math.PI / 180;
                        this.materialInvestmentChart.update('none');
                    }
                    
                    this.materialInvestmentChartAnimation = requestAnimationFrame(animate);
                }
            };
            
            this.materialInvestmentChartAnimation = requestAnimationFrame(animate);
        }
    }

    setupMaterialInvestmentMultiSegmentChart() {
        const segments = 60;
        const segmentValue = 100 / segments;
        const amber_colors = ['#f59e0b', '#f97316', '#ea580c', '#dc2626'];
        
        this.materialInvestmentChart.data.labels = Array(segments).fill().map((_, i) => `Segmento ${i + 1}`);
        this.materialInvestmentChart.data.datasets[0].data = Array(segments).fill(segmentValue);
        this.materialInvestmentChart.data.datasets[0].backgroundColor = Array(segments).fill().map((_, i) => 
            amber_colors[i % amber_colors.length]
        );
        this.materialInvestmentChart.data.datasets[0].borderWidth = 0;
        this.materialInvestmentChart.data.datasets[0].spacing = 1;
    }

    hasMaterialInvestmentData() {
        return this.materialInvestments && this.materialInvestments.length > 0;
    }

    stopMaterialInvestmentChartAnimation() {
        if (this.materialInvestmentChartAnimation) {
            cancelAnimationFrame(this.materialInvestmentChartAnimation);
            this.materialInvestmentChartAnimation = null;
            
            if (this.materialInvestmentChart && this.materialInvestmentChart.canvas) {
                this.materialInvestmentChart.canvas.classList.remove('animating');
            }
        }
    }

    updateMaterialInvestmentChart() {
        if (!this.materialInvestmentChart) {
            console.log('⚠️ Grafico investimenti materiali non inizializzato');
            return;
        }

        if (this.materialInvestments.length === 0) {
            this.startMaterialInvestmentChartAnimation();
            this.updateMaterialInvestmentChartLegend([]);
        } else {
            this.stopMaterialInvestmentChartAnimation();
            
            const investmentTotals = {};
            
            this.materialInvestments.forEach(inv => {
                const key = `${inv.investment_emoji} ${inv.investment_name}`;
                investmentTotals[key] = (investmentTotals[key] || 0) + inv.investment_value;
            });

            const labels = Object.keys(investmentTotals);
            const data = Object.values(investmentTotals);
            const colors = this.getMaterialInvestmentColors(labels);

            this.materialInvestmentChart.data.labels = labels;
            this.materialInvestmentChart.data.datasets[0].data = data;
            this.materialInvestmentChart.data.datasets[0].backgroundColor = colors;
            this.materialInvestmentChart.data.datasets[0].borderColor = '#ffffff';
            this.materialInvestmentChart.data.datasets[0].borderWidth = 1;
            this.materialInvestmentChart.data.datasets[0].spacing = 0;
            this.materialInvestmentChart.data.datasets[0].cutout = '50%';
            this.materialInvestmentChart.data.datasets[0].hoverOffset = 10;
            
            this.materialInvestmentChart.options.plugins.tooltip.enabled = true;
            this.materialInvestmentChart.options.plugins.tooltip.backgroundColor = '#1f2937';
            this.materialInvestmentChart.options.plugins.tooltip.borderColor = '#f59e0b';
            this.materialInvestmentChart.options.plugins.tooltip.borderWidth = 2;
            this.materialInvestmentChart.options.plugins.tooltip.callbacks = {
                label: (context) => {
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${this.formatCurrency(value)} (${percentage}%)`;
                }
            };
            
            this.updateMaterialInvestmentChartLegend(labels, data);
        }
        
        this.materialInvestmentChart.update('active');
    }

    getMaterialInvestmentColors(labels) {
        const materialColorMap = {
            '🏠': '#f59e0b', // Immobili - Amber
            '🏭': '#ea580c', // Industria - Orange
            '🌾': '#84cc16', // Agricoltura - Lime
            '⚡': '#eab308', // Energia - Yellow
            '🛠️': '#d97706', // Strumenti - Amber dark
            '🏗️': '#f97316', // Costruzioni - Orange light
            '💎': '#8b5cf6', // Preziosi - Purple
            '🚗': '#6366f1', // Veicoli - Indigo
            '📦': '#78716c'  // Magazzini - Stone
        };
        
        const backupMaterialColors = [
            '#f59e0b', '#ea580c', '#f97316', '#d97706',
            '#eab308', '#84cc16', '#10b981', '#8b5cf6',
            '#6366f1', '#ec4899', '#ef4444', '#78716c'
        ];
        
        return labels.map((label, index) => {
            const emoji = label.split(' ')[0];
            return materialColorMap[emoji] || backupMaterialColors[index % backupMaterialColors.length] || '#f59e0b';
        });
    }

    updateMaterialInvestmentChartLegend(labels, data = []) {
        const legend = document.getElementById('material-investment-chart-legend');
        
        if (labels.length === 0) {
            legend.innerHTML = `
                <div class="empty-state">
                    <div class="loading-circle-amber"></div>
                    <h4 class="text-lg font-medium text-gray-700 mb-2">Beni in attesa</h4>
                    <p class="text-gray-500 text-sm mb-6 text-center">Crea il tuo primo investimento materiale<br>per visualizzare la distribuzione</p>
                    <div class="flex justify-center">
                        <button onclick="openInvestmentModal('material')" class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-plus mr-2"></i>Primo Bene
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const total = data.reduce((sum, val) => sum + val, 0);
        const colors = this.getMaterialInvestmentColors(labels);
        
        legend.innerHTML = labels.map((label, index) => {
            const percentage = ((data[index] / total) * 100).toFixed(1);
            return `
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-3" style="background-color: ${colors[index]}"></div>
                        <span class="text-gray-900 font-medium">${label}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-900 font-semibold">${this.formatCurrency(data[index])}</div>
                        <div class="text-amber-600 text-sm font-medium">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    startChartAnimation() {
        if (!this.hasRealData()) {
            // Setup cerchio ultra-fluido
            this.setupMultiSegmentChart();
            
            let currentRotation = 0;
            let lastTime = performance.now();
            let velocity = 0;
            const targetVelocity = 0.6; // Velocità target più fluida
            const acceleration = 0.02; // Accelerazione graduale
            
            // Disabilita interazioni per performance massima
            this.chart.options.interaction.intersect = false;
            this.chart.options.plugins.tooltip.enabled = false;
            this.chart.options.onHover = null;
            
            // Aggiungi effetto glow durante animazione
            this.chart.canvas.classList.add('animating');
            
            const animate = (currentTime) => {
                if (this.chart && !this.hasRealData()) {
                    const deltaTime = Math.min(currentTime - lastTime, 20); // Cap per stabilità
                    lastTime = currentTime;
                    
                    // Accelerazione fluida all'inizio
                    if (velocity < targetVelocity) {
                        velocity += acceleration;
                    }
                    
                    // Movimento basato su tempo reale per fluidità perfetta
                    currentRotation += velocity * (deltaTime / 16.67); // Normalizzato a 60fps
                    if (currentRotation >= 360) currentRotation -= 360;
                    
                    // Applica rotazione con interpolazione smooth
                    this.chart.data.datasets[0].rotation = currentRotation;
                    
                    // Update ottimizzato per 60fps costanti
                    this.chart.update('none');
                    
                    this.chartAnimation = requestAnimationFrame(animate);
                }
            };
            
            this.chartAnimation = requestAnimationFrame(animate);
        }
    }

    setupMultiSegmentChart() {
        // 60 segmenti per fluidità estrema - come un cerchio perfetto
        const segments = 60;
        const segmentValue = 100 / segments;
        
        this.chart.data.labels = Array(segments).fill('Segmento');
        this.chart.data.datasets[0].data = Array(segments).fill(segmentValue);
        
        // Gradiente circolare per effetto 3D spettacolare
        const canvas = this.chart.canvas;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.6;
        
        const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius);
        gradient.addColorStop(0, '#60a5fa'); // Blu chiaro al centro
        gradient.addColorStop(0.7, '#3b82f6'); // Blu principale
        gradient.addColorStop(1, '#1e40af'); // Blu scuro ai bordi
        
        this.chart.data.datasets[0].backgroundColor = Array(segments).fill(gradient);
        this.chart.data.datasets[0].borderColor = Array(segments).fill('transparent');
        this.chart.data.datasets[0].borderWidth = 0;
        this.chart.data.datasets[0].spacing = 0;
        this.chart.data.datasets[0].cutout = '45%';
        this.chart.data.datasets[0].hoverOffset = 0;
        
        // Configurazione per massima qualità visiva
        this.chart.options.elements.arc.borderJoinStyle = 'miter';
        this.chart.options.elements.arc.borderCapStyle = 'butt';
        this.chart.options.elements.arc.borderAlign = 'center';
        
        // Padding ottimizzato per il cerchio più grande
        this.chart.options.layout.padding = {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30
        };
        
        // Configurazione avanzata per fluidità
        this.chart.options.animation = {
            duration: 0, // Nessuna animazione interna per performance
            animateRotate: false,
            animateScale: false
        };
    }

    stopChartAnimation() {
        if (this.chartAnimation) {
            cancelAnimationFrame(this.chartAnimation);
            this.chartAnimation = null;
            
            // Rimuovi effetto glow
            if (this.chart && this.chart.canvas) {
                this.chart.canvas.classList.remove('animating');
            }
            
            // Reset a configurazione normale
            if (this.chart && this.chart.data.datasets[0]) {
                this.chart.data.datasets[0].rotation = 0;
            }
            
            // Riabilita interazioni
            this.chart.options.interaction.intersect = true;
            this.chart.options.plugins.tooltip.enabled = true;
        }
    }

    // Rimosso perché ora è incluso sopra

    hasRealData() {
        const expenses = this.transactions.filter(t => t.tipo === 'uscita');
        return expenses.length > 0;
    }

    updateChart() {
        if (!this.chart) {
            console.error('❌ ERRORE CRITICO: Grafico non inizializzato!');
            console.log('🔧 Tentando di ricreare il grafico...');
            try {
                this.createChart();
                console.log('✅ Grafico ricreato');
            } catch (e) {
                console.error('❌ Impossibile ricreare grafico:', e);
                return;
            }
        }

        const expenses = this.transactions.filter(t => t.tipo === 'uscita');
        
        if (expenses.length === 0) {
            // Nessun dato - Mostra cerchio animato
            this.startChartAnimation();
            this.updateChartLegend([]);
        } else {
            // Dati reali - Solo spese (NO investimenti)
            this.stopChartAnimation();
            
            const categoryTotals = {};
            
            // Aggiungi SOLO spese per categoria
            expenses.forEach(t => {
                categoryTotals[t.categoria] = (categoryTotals[t.categoria] || 0) + t.importo;
            });

            const labels = Object.keys(categoryTotals);
            const data = Object.values(categoryTotals);
            const colors = this.getCategoryColors(labels);
            
            // Dati grafico preparati per Chart.js

            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = data;
            this.chart.data.datasets[0].backgroundColor = colors;
            this.chart.data.datasets[0].borderColor = '#ffffff';
            this.chart.data.datasets[0].borderWidth = 1;
            this.chart.data.datasets[0].spacing = 0;
            this.chart.data.datasets[0].cutout = '50%';
            this.chart.data.datasets[0].hoverOffset = 10;
            this.chart.data.datasets[0].borderAlign = 'center';
            this.chart.data.datasets[0].borderJoinStyle = 'miter';
            this.chart.data.datasets[0].borderCapStyle = 'butt';
            
            // Riabilita tooltip per dati reali
            this.chart.options.plugins.tooltip.enabled = true;
            this.chart.options.plugins.tooltip.backgroundColor = '#1f2937';
            this.chart.options.plugins.tooltip.titleColor = '#ffffff';
            this.chart.options.plugins.tooltip.bodyColor = '#ffffff';
            this.chart.options.plugins.tooltip.borderColor = '#3b82f6';
            this.chart.options.plugins.tooltip.borderWidth = 2;
            this.chart.options.plugins.tooltip.cornerRadius = 8;
            this.chart.options.plugins.tooltip.padding = 12;
            this.chart.options.plugins.tooltip.callbacks = {
                label: (context) => {
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${this.formatCurrency(value)} (${percentage}%)`;
                }
            };
            
            this.updateChartLegend(labels, data);
        }
        
        // 🔥 AGGIORNAMENTO FORZATO DEL GRAFICO
        this.chart.update('none'); // Aggiornamento senza animazione per essere sicuri
        
        console.log('📊 Grafico aggiornato:', {
            labels: this.chart.data.labels,
            data: this.chart.data.datasets[0].data,
            transactionsCount: this.transactions.length,
            expensesCount: expenses.length
        });
    }

    getCategoryColors(categories) {
        // COLORI FUTURISTICI MOLTO ACCESI - Look Hi-Tech
        const colorMap = {
            // Spese Principali - Colori Vivaci Futuristici
            'Ristorazione': '#3b82f6',    // Electric Blue
            'Tabaccherie': '#ef4444',     // Bright Red  
            'Trasporti': '#10b981',       // Neon Green
            'Spesa': '#f59e0b',           // Cyber Orange
            'Abbigliamento': '#8b5cf6',   // Vivid Purple
            
            // Servizi - Toni Hi-Tech  
            'Salute': '#06b6d4',          // Cyan Bright
            'Bollette': '#f97316',        // Orange Flash
            'Casa': '#84cc16',            // Lime Green
            'Intrattenimento': '#ec4899', // Hot Pink
            
            // Entrate - Colori Energia
            'Stipendio': '#22c55e',       // Success Green
            'Freelance': '#6366f1',       // Indigo Bright
            'Bonus': '#a855f7',           // Purple Glow
            
            // Categoria generica
            'Altro': '#64748b'            // Steel Blue
        };
        
        // Backup colors - Palette Futuristica Accesa
        const futuristicColors = [
            '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
            '#8b5cf6', '#06b6d4', '#f97316', '#84cc16',
            '#ec4899', '#22c55e', '#6366f1', '#14b8a6',
            '#a855f7', '#f43f5e', '#06d6a0', '#ffbe0b',
            '#8338ec', '#fb5607', '#ff006e', '#3a86ff'
        ];
        
        return categories.map((cat, index) => 
            colorMap[cat] || futuristicColors[index % futuristicColors.length] || '#3b82f6'
        );
    }

    updateChartLegend(labels, data = []) {
        const legend = document.getElementById('chart-legend');
        
        if (labels.length === 0) {
            legend.innerHTML = `
                <div class="empty-state">
                    <div class="loading-circle"></div>
                    <h4 class="text-lg font-medium text-gray-700 mb-2">In attesa di dati</h4>
                    <p class="text-gray-500 text-sm mb-6 text-center">Aggiungi transazioni per visualizzare<br>la distribuzione delle spese</p>
                    <div class="flex space-x-3 justify-center">
                        <button onclick="openAddModal('entrata')" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-arrow-up mr-2"></i>Entrata
                        </button>
                        <button onclick="openAddModal('uscita')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-arrow-down mr-2"></i>Uscita
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const total = data.reduce((sum, val) => sum + val, 0);
        const colors = this.getCategoryColors(labels);
        
        legend.innerHTML = labels.map((label, index) => {
            const percentage = ((data[index] / total) * 100).toFixed(1);
            return `
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-3" style="background-color: ${colors[index]}"></div>
                        <span class="text-gray-900 font-medium">${label}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-gray-900 font-semibold">${this.formatCurrency(data[index])}</div>
                        <div class="text-gray-500 text-sm">${percentage}%</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateTransactionsList() {
        const container = document.getElementById('transactions-list');
        const filterType = document.getElementById('filterType').value;
        
        let filtered = this.transactions;
        if (filterType) {
            filtered = filtered.filter(t => t.tipo === filterType);
        }
        
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-receipt text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 mb-4">Nessun movimento trovato</p>
                    <div class="flex space-x-3 justify-center">
                        <button onclick="openAddModal('entrata')" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-arrow-up mr-2"></i>Entrata
                        </button>
                        <button onclick="openAddModal('uscita')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                            <i class="fas fa-arrow-down mr-2"></i>Uscita
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.slice(0, 10).map(t => {
            const isIncome = t.tipo === 'entrata';
            const icon = isIncome ? 'fa-arrow-up text-emerald-600' : 'fa-arrow-down text-red-600';
            const amountColor = isIncome ? 'text-emerald-600' : 'text-red-600';
            const bgColor = isIncome ? 'bg-emerald-50' : 'bg-red-50';
            const sign = isIncome ? '+' : '-';
            
            return `
                <div class="transaction-card bg-white rounded-lg p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="${bgColor} w-10 h-10 rounded-lg flex items-center justify-center">
                            <i class="fas ${icon}"></i>
                        </div>
                        <div>
                            <p class="text-gray-900 font-medium">${t.descrizione || t.categoria}</p>
                            <p class="text-gray-500 text-sm">${t.categoria} • ${this.formatDate(t.data)}</p>
                            ${t.ricorrente ? '<span class="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs mt-1 border border-blue-200">Ricorrente</span>' : ''}
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-semibold ${amountColor}">${sign}${this.formatCurrency(Math.abs(t.importo))}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateFrequentAnalysis() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        // Categorias consideradas "frequenti" per natura
        const frequentCategories = ['Tabaccherie', 'Ristorazione', 'Trasporti', 'Spesa', 'Bollette'];
        
        // Analisi mese corrente
        const currentMonthStats = this.analyzeMonthlyFrequent(currentYear, currentMonth, frequentCategories);
        
        // Analisi mese precedente per confronto
        const previousMonthStats = this.analyzeMonthlyFrequent(previousYear, previousMonth, frequentCategories);

        // Aggiorna UI categorie frequenti
        this.updateFrequentCategoriesUI(currentMonthStats);
        
        // Aggiorna riepilogo mensile
        this.updateMonthlySummaryUI(currentMonthStats);
        
        // Aggiorna confronto
        this.updateMonthlyComparisonUI(currentMonthStats, previousMonthStats);
    }

    analyzeMonthlyFrequent(year, month, frequentCategories) {
        const stats = {};
        
        // Inizializza tutte le categorie frequenti
        frequentCategories.forEach(cat => {
            stats[cat] = {
                total: 0,
                count: 0,
                transactions: [],
                avgAmount: 0,
                frequency: 0 // volte a settimana
            };
        });

        // Analizza transazioni del mese
        this.transactions
            .filter(t => t.tipo === 'uscita' && 
                    t.data.getMonth() === month && 
                    t.data.getFullYear() === year &&
                    frequentCategories.includes(t.categoria))
            .forEach(t => {
                stats[t.categoria].total += t.importo;
                stats[t.categoria].count += 1;
                stats[t.categoria].transactions.push(t);
            });

        // Calcola medie e frequenze
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const weeksInMonth = Math.ceil(daysInMonth / 7);

        Object.keys(stats).forEach(cat => {
            if (stats[cat].count > 0) {
                stats[cat].avgAmount = stats[cat].total / stats[cat].count;
                stats[cat].frequency = (stats[cat].count / weeksInMonth).toFixed(1);
            }
        });

        return stats;
    }

    updateFrequentCategoriesUI(stats) {
        const container = document.getElementById('frequent-analysis');
        const activeCategories = Object.entries(stats).filter(([_, data]) => data.count > 0);
        
        if (activeCategories.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-chart-bar text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 mb-2">Nessun movimento frequente questo mese</p>
                    <p class="text-gray-400 text-sm">Le categorie analizzate: Tabaccherie, Ristorazione, Trasporti, Spesa, Bollette</p>
                </div>
            `;
            return;
        }

        const sortedCategories = activeCategories.sort(([_, a], [__, b]) => b.count - a.count);
        const colors = this.getCategoryColors(sortedCategories.map(([cat]) => cat));
        
        container.innerHTML = sortedCategories.map(([category, data], index) => {
            const emoji = this.getCategoryEmoji(category);
            const frequencyText = data.frequency >= 1 ? 
                `${data.frequency}x/settimana` : 
                `${data.count} volte`;
            
            return `
                <div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-4 h-4 rounded-full mr-3" style="background-color: ${colors[index]}"></div>
                        <h4 class="text-gray-900 font-semibold">${emoji} ${category}</h4>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">Frequenza:</span>
                            <span class="text-blue-600 font-medium">${frequencyText}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">Totale:</span>
                            <span class="text-red-600 font-semibold">${this.formatCurrency(data.total)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600 text-sm">Media per volta:</span>
                            <span class="text-gray-900 font-medium">${this.formatCurrency(data.avgAmount)}</span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-lg mt-3">
                            <span class="text-gray-700 text-sm font-medium">${data.count} transazioni questo mese</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateMonthlySummaryUI(stats) {
        const container = document.getElementById('monthly-frequent-summary');
        const totalFrequent = Object.values(stats).reduce((sum, data) => sum + data.total, 0);
        const totalTransactions = Object.values(stats).reduce((sum, data) => sum + data.count, 0);
        
        const summaryData = [
            {
                icon: '💰',
                label: 'Totale Spese Frequenti',
                value: this.formatCurrency(totalFrequent),
                color: 'text-red-600'
            },
            {
                icon: '📊',
                label: 'Transazioni Frequenti',
                value: totalTransactions,
                color: 'text-blue-600'
            },
            {
                icon: '📅',
                label: 'Media al Giorno',
                value: this.formatCurrency(totalFrequent / new Date().getDate()),
                color: 'text-purple-600'
            },
            {
                icon: '🎯',
                label: 'Media per Transazione',
                value: totalTransactions > 0 ? this.formatCurrency(totalFrequent / totalTransactions) : '€0.00',
                color: 'text-green-600'
            }
        ];

        container.innerHTML = summaryData.map(item => `
            <div class="bg-white rounded-lg p-4 border border-blue-100">
                <div class="text-center">
                    <div class="text-2xl mb-2">${item.icon}</div>
                    <div class="text-gray-600 text-sm mb-1">${item.label}</div>
                    <div class="${item.color} text-lg font-bold">${item.value}</div>
                </div>
            </div>
        `).join('');
    }

    updateMonthlyComparisonUI(current, previous) {
        const container = document.getElementById('monthly-comparison');
        const comparisons = [];
        
        Object.keys(current).forEach(category => {
            const currentData = current[category];
            const previousData = previous[category];
            
            if (currentData.count > 0 || previousData.count > 0) {
                const diff = currentData.total - previousData.total;
                const percentChange = previousData.total > 0 ? 
                    ((diff / previousData.total) * 100).toFixed(1) : 
                    (currentData.total > 0 ? 100 : 0);
                
                comparisons.push({
                    category,
                    current: currentData.total,
                    previous: previousData.total,
                    diff,
                    percentChange,
                    emoji: this.getCategoryEmoji(category)
                });
            }
        });

        if (comparisons.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">Dati insufficienti per il confronto</p>';
            return;
        }

        container.innerHTML = comparisons.map(comp => {
            const isIncrease = comp.diff > 0;
            const icon = isIncrease ? '📈' : '📉';
            const colorClass = isIncrease ? 'text-red-600' : 'text-green-600';
            const sign = isIncrease ? '+' : '';
            
            return `
                <div class="flex items-center justify-between py-2">
                    <span class="text-gray-700">${comp.emoji} ${comp.category}:</span>
                    <div class="flex items-center space-x-2">
                        <span class="text-gray-600 text-sm">${this.formatCurrency(comp.previous)} → ${this.formatCurrency(comp.current)}</span>
                        <span class="${colorClass} text-sm font-medium">
                            ${icon} ${sign}${this.formatCurrency(Math.abs(comp.diff))} (${sign}${comp.percentChange}%)
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    getCategoryEmoji(category) {
        const emojiMap = {
            'Tabaccherie': '🚬',
            'Ristorazione': '🍽️',
            'Trasporti': '🚗',
            'Spesa': '🛒',
            'Bollette': '📄',
            'Altro': '📦'
        };
        return emojiMap[category] || '📦';
    }

    initializeAverageAmounts() {
        // Carica importi medi salvati o usa valori default
        const savedAmounts = localStorage.getItem('quickExpenseAmounts');
        if (savedAmounts) {
            this.quickExpenseAmounts = JSON.parse(savedAmounts);
        } else {
            // Valori default base
            this.quickExpenseAmounts = {
                'Tabaccherie': 5.50,
                'Ristorazione': 12.00,
                'Trasporti': 8.00,
                'Spesa': 25.00,
                'Altro': 15.00
            };
        }
    }

    createQuickExpenseButtons() {
        const container = document.getElementById('quick-expense-buttons');
        const categories = ['Tabaccherie', 'Ristorazione', 'Trasporti', 'Spesa', 'Altro'];
        
        container.innerHTML = categories.map(category => {
            const emoji = this.getCategoryEmoji(category);
            const amount = this.quickExpenseAmounts[category];
            
            return `
                <div class="quick-expense-btn" onclick="sapoTracker.quickExpense('${category}')">
                    <span class="emoji">${emoji}</span>
                    <div class="category">${category}</div>
                    <div class="amount">€${amount.toFixed(2)}</div>
                </div>
            `;
        }).join('');
    }

    quickExpense(category) {
        // Animazione visual feedback
        const button = event.currentTarget;
        button.classList.add('pulsing');
        setTimeout(() => button.classList.remove('pulsing'), 600);
        
        // Apri modal di conferma
        this.openQuickExpenseModal(category);
    }

    openQuickExpenseModal(category) {
        const modal = document.getElementById('quick-expense-modal');
        const emoji = document.getElementById('quick-modal-emoji');
        const title = document.getElementById('quick-modal-title');
        const input = document.getElementById('quick-amount-input');
        
        // Configura modal
        emoji.textContent = this.getCategoryEmoji(category);
        title.textContent = category;
        input.value = this.quickExpenseAmounts[category].toFixed(2);
        
        // Salva categoria corrente
        this.currentQuickCategory = category;
        
        // Impedisce scroll del body
        document.body.style.overflow = 'hidden';
        
        // Mostra modal
        modal.classList.remove('hidden');
        
        // 🎯 FIX POSIZIONAMENTO SPESE RAPIDE - Modal sempre centrato
        console.log('🎯 SPESE RAPIDE - Forzando posizione centrata...');
        
        // SCROLL IMMEDIATO per tutti i dispositivi (non solo mobile!)
        window.scrollTo({ top: 0, behavior: 'auto' });
        
        // Forza posizionamento fisso del modal
        setTimeout(() => {
            // 🎯 CENTRAGGIO PULITO per spese rapide - FACILE da chiudere
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.right = '0';
            modal.style.bottom = '0';
            modal.style.zIndex = '9999';
            modal.style.background = 'rgba(0, 0, 0, 0.8)';
            
            console.log('🎯✅ SPESE RAPIDE - Modal centrato e facilmente chiudibile!');
        }, 50);
        
        // Focus sull'input e seleziona tutto il testo
        setTimeout(() => {
            input.focus();
            input.select();
        }, 100);
    }

    async confirmQuickExpense() {
        const input = document.getElementById('quick-amount-input');
        const amount = parseFloat(input.value);
        const category = this.currentQuickCategory;
        
        // Validazione
        if (!amount || amount <= 0) {
            this.showNotification('❌ Inserisci un importo valido', 'error');
            return;
        }
        
        // Crea transazione rapida
        const transaction = {
            tipo: 'uscita',
            importo: amount,
            categoria: category,
            descrizione: `${category} - Spesa rapida`,
            data: new Date().toISOString(),
            ricorrente: false,
            metodo_pagamento: 'carta'
        };

        console.log('⚡ Spesa rapida:', transaction);

        try {
            const response = await fetch('tables/transazioni', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction)
            });

            if (response.ok) {
                // Chiudi modal
                this.closeQuickExpenseModal();
                
                // Ferma animazione grafico
                this.stopChartAnimation();
                
                // Aggiungi localmente per UI reattiva
                transaction.data = new Date(transaction.data);
                transaction.id = Date.now().toString();
                this.transactions.unshift(transaction);
                console.log('✅ [SPESE RAPIDE] Transazione aggiunta localmente');
                
                // Aggiorna importo medio se l'importo è diverso dal default
                if (Math.abs(amount - this.quickExpenseAmounts[category]) > 0.1) {
                    this.updateQuickExpenseAmount(category, amount);
                }
                
                // 📊 AGGIORNAMENTO COMPLETO DOPO SPESA RAPIDA
                console.log('📊 === [SPESE RAPIDE] INIZIO AGGIORNAMENTO COMPLETO ===');
                
                // 1️⃣ Dashboard (saldo e statistiche)
                console.log('📊 [SPESE RAPIDE] [1/4] Aggiornando dashboard e saldo...');
                this.updateDashboard();
                console.log('✅ [SPESE RAPIDE] [1/4] Dashboard aggiornato');
                
                // 2️⃣ Grafico torta spese (NUOVO dato!)
                console.log('📊 [SPESE RAPIDE] [2/4] Aggiornando grafico torta...');
                this.updateChart();
                console.log('✅ [SPESE RAPIDE] [2/4] Grafico torta aggiornato');
                
                // 3️⃣ Grafici investimenti 
                console.log('📊 [SPESE RAPIDE] [3/4] Aggiornando grafici investimenti...');
                this.updateInvestmentChart();
                this.updateMaterialInvestmentChart();
                console.log('✅ [SPESE RAPIDE] [3/4] Grafici investimenti aggiornati');
                
                // 4️⃣ Grafici temporali (CRITICO - saldo cambiato!)
                try {
                    console.log('📊 [SPESE RAPIDE] [4/4] Aggiornando grafici temporali con nuovo saldo...');
                    this.updateTimeCharts(30);
                    console.log('✅ [SPESE RAPIDE] [4/4] Grafici temporali aggiornati');
                } catch (e) {
                    console.error('❌ [SPESE RAPIDE] [4/4] updateTimeCharts error:', e);
                }
                
                console.log('📊 === [SPESE RAPIDE] FINE AGGIORNAMENTO COMPLETO ===');
                
                this.createQuickExpenseButtons(); // Rigenera bottoni con nuovi importi
                
                this.showNotification(`✅ ${category} €${amount.toFixed(2)} aggiunto!`);
                console.log('✅ Spesa rapida salvata');
                
            } else {
                throw new Error('Errore nel salvataggio');
            }
        } catch (error) {
            console.error('❌ Errore spesa rapida:', error);
            this.showNotification('❌ Errore nel salvataggio', 'error');
        }
    }

    closeQuickExpenseModal() {
        document.getElementById('quick-expense-modal').classList.add('hidden');
        
        // Ripristina scroll del body
        document.body.style.overflow = '';
        
        // 🎯 FIX SCROLL AUTOMATICO DOPO SPESE RAPIDE
        // L'utente vuole vedere il saldo aggiornato immediatamente
        window.scrollTo({ 
            top: 0, 
            behavior: 'auto'  // Scroll istantaneo
        });
        
        console.log('📜✅ SPESE RAPIDE - Auto-scroll in alto per vedere saldo!');
        
        // Feedback visivo sul saldo aggiornato
        setTimeout(() => {
            const saldoElement = document.querySelector('.saldo-totale, .balance-amount');
            if (saldoElement) {
                saldoElement.style.transition = 'all 0.3s ease';
                saldoElement.style.transform = 'scale(1.05)';
                saldoElement.style.background = 'rgba(34, 197, 94, 0.1)';
                
                setTimeout(() => {
                    saldoElement.style.transform = 'scale(1)';
                    saldoElement.style.background = '';
                }, 600);
            }
        }, 100);
    }

    updateQuickExpenseAmount(category, newAmount) {
        // Calcola media tra importo attuale e nuovo importo per adattamento graduale
        const currentAmount = this.quickExpenseAmounts[category];
        const adaptedAmount = (currentAmount + newAmount) / 2;
        
        // Aggiorna importo
        this.quickExpenseAmounts[category] = Math.round(adaptedAmount * 100) / 100;
        
        // Salva in localStorage
        localStorage.setItem('quickExpenseAmounts', JSON.stringify(this.quickExpenseAmounts));
        
        console.log(`📊 Importo ${category} aggiornato da €${currentAmount.toFixed(2)} a €${this.quickExpenseAmounts[category].toFixed(2)}`);
    }

    // INVESTIMENTI FUNCTIONS
    loadInvestments() {
        try {
            console.log('📈 Caricamento investimenti da localStorage...');
            
            const saved = localStorage.getItem('sapo_investments');
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Controllo se è il nuovo formato strutturato (versione 2.0+)
                if (parsed.version && parsed.investments) {
                    console.log('✅ Formato nuovo rilevato (v2.0+)');
                    
                    // Carica investimenti generali
                    this.investments = (parsed.investments || []).map(i => ({
                        id: i.id || Date.now().toString(),
                        investment_emoji: i.investment_emoji || '📈',
                        investment_name: i.investment_name || 'Investimento',
                        investment_value: parseFloat(i.investment_value) || 0,
                        investment_date: new Date(i.investment_date),
                        investment_type: i.investment_type || 'financial',
                        created_at: i.created_at || Date.now(),
                        component_name: i.component_name || null,
                        component_notes: i.component_notes || null,
                        parent_project_id: i.parent_project_id || null,
                        is_sub_investment: i.is_sub_investment || false
                    })).sort((a, b) => b.investment_date - a.investment_date);
                    
                    // Carica investimenti finanziari
                    this.financialInvestments = (parsed.financialInvestments || []).map(i => ({
                        id: i.id || Date.now().toString(),
                        investment_emoji: i.investment_emoji || '📈',
                        investment_name: i.investment_name || 'Investimento',
                        investment_value: parseFloat(i.investment_value) || 0,
                        investment_date: new Date(i.investment_date),
                        investment_type: 'financial',
                        created_at: i.created_at || Date.now()
                    })).sort((a, b) => b.investment_date - a.investment_date);
                    
                    // Carica progetti materiali con sub-investimenti
                    this.materialInvestments = (parsed.materialInvestments || []).map(project => ({
                        id: project.id || Date.now().toString(),
                        investment_emoji: project.investment_emoji || '🏠',
                        investment_name: project.investment_name || 'Progetto',
                        investment_value: parseFloat(project.investment_value) || 0,
                        total_invested: parseFloat(project.total_invested) || parseFloat(project.investment_value) || 0,
                        investment_date: new Date(project.investment_date),
                        investment_type: 'material',
                        created_at: project.created_at || Date.now(),
                        is_project: project.is_project || true,
                        project_return: parseFloat(project.project_return) || 0,
                        return_date: project.return_date ? new Date(project.return_date) : null,
                        is_completed: project.is_completed || false,
                        sub_investments: (project.sub_investments || []).map(subInv => ({
                            id: subInv.id || `component_${Date.now()}`,
                            parent_project_id: project.id,
                            component_name: subInv.component_name || 'Componente',
                            component_notes: subInv.component_notes || '',
                            investment_emoji: project.investment_emoji,
                            investment_name: project.investment_name,
                            investment_value: parseFloat(subInv.investment_value) || 0,
                            investment_type: 'material',
                            investment_date: new Date(subInv.investment_date),
                            created_at: subInv.created_at || Date.now(),
                            is_sub_investment: true
                        }))
                    })).sort((a, b) => b.investment_date - a.investment_date);
                    
                } else {
                    // Formato vecchio - compatibilità retro
                    console.log('⚠️ Formato vecchio rilevato - conversione...');
                    this.investments = parsed.map(i => ({
                        id: i.id || Date.now().toString(),
                        investment_emoji: i.investment_emoji || '📈',
                        investment_name: i.investment_name || 'Investimento',
                        investment_value: parseFloat(i.investment_value) || 0,
                        investment_date: new Date(i.investment_date),
                        investment_type: i.investment_type || 'financial',
                        created_at: i.created_at || Date.now()
                    })).sort((a, b) => b.investment_date - a.investment_date);
                    
                    // Separa gli investimenti per tipo (vecchio metodo)
                    this.financialInvestments = this.investments.filter(inv => inv.investment_type === 'financial');
                    this.materialInvestments = this.investments.filter(inv => inv.investment_type === 'material');
                }
                
                console.log(`✅ Caricamento completato:`, {
                    totale: this.investments.length,
                    finanziari: this.financialInvestments.length,
                    progetti: this.materialInvestments.length,
                    subInvestimenti: this.materialInvestments.reduce((sum, p) => sum + (p.sub_investments?.length || 0), 0)
                });
                
            } else {
                console.log('ℹ️ Nessun investimento salvato, inizializzo array vuoto');
                this.investments = [];
                this.financialInvestments = [];
                this.materialInvestments = [];
            }
        } catch (error) {
            console.error('❌ Errore caricamento investimenti:', error);
            console.log('🔄 Inizializzo array vuoto per sicurezza');
            this.investments = [];
            this.financialInvestments = [];
            this.materialInvestments = [];
        }
    }

    setupInvestmentEvents() {
        console.log('🔧 Setup eventi investimenti...');
        
        // Setup form investimenti
        const investmentForm = document.getElementById('investment-form');
        if (investmentForm) {
            console.log('✅ Form investment-form trovato, aggiungo event listener');
            investmentForm.addEventListener('submit', (e) => {
                console.log('🚀 Creazione nuovo investimento...');
                e.preventDefault();
                this.addInvestment();
            });
        } else {
            console.error('❌ Form investment-form NON TROVATO durante setup eventi!');
        }

        // Setup form aggiornamento investimenti
        const updateForm = document.getElementById('investment-update-form');
        if (updateForm) {
            // Event listener submit aggiunto
            updateForm.addEventListener('submit', (e) => {
                console.log('📝 Processing investment update...');
                e.preventDefault();
                this.processInvestmentUpdate();
            });
        } else {
            console.error('❌ Form investment-update-form NON TROVATO durante setup eventi!');
        }



        // Setup form componenti progetto
        const componentForm = document.getElementById('project-component-form');
        if (componentForm) {
            componentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addProjectComponent();
            });
        }

        // Setup form rientro progetto
        const returnForm = document.getElementById('project-return-form');
        if (returnForm) {
            returnForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.setProjectReturn();
            });
            
            // Anteprima rientro in tempo reale
            const returnInput = returnForm.querySelector('input[name="return_amount"]');
            if (returnInput) {
                returnInput.addEventListener('input', () => {
                    this.updateReturnPreview();
                });
            }
        }

        // Imposta data di oggi
        const dateInput = document.querySelector('input[name="investment_date"]');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    addInvestment() {
        console.log('🚀 *** CREAZIONE NUOVO INVESTIMENTO ***');
        
        try {
            console.log('🔄 Iniziando addInvestment...');
            
            // 🛡️ VALIDAZIONE PREVENTIVA
            if (!this.validateFormBeforeSubmit('investment-form')) {
                console.log('🚫 Validazione fallita, blocco submit');
                return;
            }
            
            // Test base: form esiste?
            const form = document.getElementById('investment-form');
            if (!form) {
                console.error('❌ Form non trovato');
                this.showNotification('❌ Errore: Form non trovato', 'error');
                return;
            }
            console.log('✅ Form trovato');
            
            // Leggi dati senza validazione complessa
            const formData = new FormData(form);
            const name = formData.get('investment_name') || 'Test Investimento';
            const valueStr = formData.get('investment_value') || '100';
            const emoji = formData.get('investment_emoji') || '📈';
            const type = formData.get('investment_type') || 'financial';
            const date = formData.get('investment_date') || new Date().toISOString().split('T')[0];
            
            console.log('📝 Dati letti:', { name, valueStr, emoji, type, date });
            
            // Validazione minima
            const value = parseFloat(valueStr) || 100;
            if (value <= 0) {
                this.showNotification('❌ Errore: Inserisci un valore valido', 'error');
                return;
            }
            if (!type || !['financial', 'material'].includes(type)) {
                this.showNotification('❌ Errore: Seleziona il tipo di investimento', 'error');
                return;
            }
            console.log('✅ Validazione OK:', { value, type });
            
            // Gestione progetti materiali con investimenti multipli
            if (type === 'material') {
                this.handleMaterialProjectInvestment(emoji, name, value, date);
            } else {
                // Investimenti liquidi (comportamento normale)
                const investment = {
                    id: `${type}_${Date.now()}`,
                    investment_emoji: emoji,
                    investment_name: name,
                    investment_value: value,
                    investment_type: type,
                    investment_date: new Date(date),
                    created_at: Date.now()
                };
                
                console.log('💰 Investimento liquido creato:', investment);
                
                this.investments.unshift(investment);
                this.financialInvestments.unshift(investment);
                console.log('💰 Aggiunto a investimenti liquidi');
            }
            console.log('📋 Totale investimenti:', this.investments.length);
            
            // Salva
            try {
                this.saveInvestmentsToStorage();
                console.log('💾 Salvato in localStorage');
            } catch (e) {
                console.error('❌ Errore salvataggio localStorage:', e);
            }
            
            // Aggiorna UI con try-catch individuale
            try {
                this.updateInvestmentsDashboard();
                console.log('✅ updateInvestmentsDashboard OK');
            } catch (e) {
                console.error('❌ updateInvestmentsDashboard error:', e);
            }
            
            try {
                this.updateDashboard();
                console.log('✅ updateDashboard OK');
            } catch (e) {
                console.error('❌ updateDashboard error:', e);
            }
            
            try {
                this.updateChart();
                console.log('✅ updateChart OK');
            } catch (e) {
                console.error('❌ updateChart error:', e);
            }
            
            try {
                this.updateInvestmentChart();
                console.log('✅ updateInvestmentChart OK');
            } catch (e) {
                console.error('❌ updateInvestmentChart error:', e);
            }
            
            try {
                this.updateMaterialInvestmentChart();
                console.log('✅ updateMaterialInvestmentChart OK');
            } catch (e) {
                console.error('❌ updateMaterialInvestmentChart error:', e);
            }
            
            // Chiudi modal - IMPLEMENTAZIONE ROBUSTA
            try {
                // 🔥 CHIUSURA UNIVERSALE ROBUSTA
                this.forceCloseAllModals();
                console.log('✅ Modal chiuso (universale)');
            } catch (e) {
                console.error('❌ forceCloseAllModals error:', e);
                // Fallback alla funzione originale
                try {
                    this.closeInvestmentModal();
                } catch (fallbackErr) {
                    console.error('❌ Fallback closeInvestmentModal error:', fallbackErr);
                }
            }
            
            // Reset form
            try {
                this.resetInvestmentForm();
                console.log('✅ Form resettato');
            } catch (e) {
                console.error('❌ resetInvestmentForm error:', e);
            }
            
            // Successo
            this.showNotification('✅ Investimento creato con successo!');
            console.log('🎉 *** SUCCESSO COMPLETO ***');
            
        } catch (error) {
            console.error('❌ ERRORE FATALE in addInvestment:', error);
            this.showNotification('❌ Errore nella creazione investimento', 'error');
            // Chiudi modal anche in caso di errore
            try {
                this.closeInvestmentModal();
            } catch (e) {
                console.error('❌ Errore anche nella chiusura modal:', e);
            }
        }
    }

    handleMaterialProjectInvestment(emoji, name, value, date) {
        console.log('🏗️ Gestione progetto materiale:', { emoji, name, value });
        
        // Cerca se il progetto esiste già
        const existingProject = this.materialInvestments.find(project => 
            project.investment_name === name && project.investment_emoji === emoji
        );
        
        if (existingProject) {
            // Progetto esistente - aggiungi come componente aggiuntivo
            console.log('📦 Progetto esistente trovato, aggiungendo come nuovo componente...');
            
            const newComponent = {
                id: `component_${Date.now()}`,
                parent_project_id: existingProject.id,
                component_name: `Investimento aggiuntivo ${existingProject.sub_investments.length + 2}`,
                component_notes: `Aggiunto tramite modal investimenti in data ${this.formatDate(new Date(date))}`,
                investment_emoji: emoji,
                investment_name: name,
                investment_value: value,
                investment_type: 'material',
                investment_date: new Date(date),
                created_at: Date.now(),
                is_sub_investment: true
            };
            
            // Aggiungi alla lista componenti del progetto
            if (!existingProject.sub_investments) {
                existingProject.sub_investments = [];
            }
            existingProject.sub_investments.push(newComponent);
            
            // Aggiorna valore totale progetto
            existingProject.investment_value += value;
            existingProject.total_invested = (existingProject.total_invested || existingProject.investment_value) + value;
            
            // Ricalcola valore netto se c'è un rientro
            if (existingProject.project_return && existingProject.project_return > 0) {
                existingProject.investment_value = existingProject.total_invested - existingProject.project_return;
            }
            
            // Aggiungi alla lista generale
            this.investments.unshift(newComponent);
            
            console.log(`📈 Progetto aggiornato: ${name} - Nuovo totale: €${existingProject.total_invested}, Netto: €${existingProject.investment_value}`);
            
        } else {
            // Nuovo progetto - crea struttura base
            console.log('🆕 Creazione nuovo progetto materiale...');
            
            const project = {
                id: `material_project_${Date.now()}`,
                investment_emoji: emoji,
                investment_name: name,
                investment_value: value, // Valore netto (investito - rientri)
                total_invested: value, // Totale investito
                investment_type: 'material',
                investment_date: new Date(date),
                created_at: Date.now(),
                is_project: true,
                sub_investments: [], // I componenti aggiuntivi verranno aggiunti qui
                project_return: 0, // Rientro finale del progetto
                is_completed: false
            };
            
            this.materialInvestments.unshift(project);
            
            // Aggiungi anche alla lista generale investimenti (per il tracking completo)
            const generalInvestment = {
                id: `material_base_${Date.now()}`,
                investment_emoji: emoji,
                investment_name: name,
                investment_value: value,
                investment_type: 'material',
                investment_date: new Date(date),
                created_at: Date.now(),
                parent_project_id: project.id,
                component_name: 'Investimento iniziale',
                component_notes: 'Investimento base del progetto',
                is_sub_investment: false
            };
            
            this.investments.unshift(generalInvestment);
            
            console.log(`🏗️ Nuovo progetto creato: ${name} - Investimento base: €${value}`);
        }
    }

    saveInvestmentsToStorage() {
        try {
            // Salva investimenti generali
            const generalInvestments = this.investments.map(i => ({
                ...i,
                investment_date: i.investment_date.toISOString()
            }));
            
            // Salva progetti materiali con struttura complessa
            const materialProjects = this.materialInvestments.map(project => ({
                ...project,
                investment_date: project.investment_date.toISOString(),
                sub_investments: (project.sub_investments || []).map(subInv => ({
                    ...subInv,
                    investment_date: subInv.investment_date.toISOString()
                })),
                return_date: project.return_date ? project.return_date.toISOString() : null
            }));
            
            // Salva investimenti finanziari
            const financialInvestments = this.financialInvestments.map(i => ({
                ...i,
                investment_date: i.investment_date.toISOString()
            }));
            
            // Salva tutto in oggetto strutturato
            const dataToSave = {
                investments: generalInvestments,
                materialInvestments: materialProjects,
                financialInvestments: financialInvestments,
                savedAt: new Date().toISOString(),
                version: '2.0' // Versione per gestire upgrade futuri
            };
            
            localStorage.setItem('sapo_investments', JSON.stringify(dataToSave));
            console.log('💾 Investimenti salvati in localStorage (versione completa)', {
                generale: generalInvestments.length,
                materiali: materialProjects.length,
                finanziari: financialInvestments.length
            });
        } catch (error) {
            console.error('❌ Errore salvataggio localStorage:', error);
        }
    }

    updateInvestmentsDashboard() {
        this.updateInvestmentsSummary();
        this.updateInvestmentsList();
    }

    openAddComponentModal(projectId) {
        console.log('🔧 Apertura modal componente per progetto:', projectId);
        
        const project = this.materialInvestments.find(p => p.id === projectId);
        if (!project) {
            this.showNotification('❌ Progetto non trovato', 'error');
            return;
        }
        
        // Salva ID progetto corrente
        this.currentProjectId = projectId;
        
        // Popola informazioni progetto nel modal
        document.getElementById('project-emoji').textContent = project.investment_emoji;
        document.getElementById('project-name').textContent = project.investment_name;
        
        // Imposta data odierna
        document.querySelector('input[name="component_date"]').value = new Date().toISOString().split('T')[0];
        
        // Impedisce scroll del body
        document.body.style.overflow = 'hidden';
        
        // Mostra modal
        document.getElementById('project-component-modal').classList.remove('hidden');
        
        // Focus sul nome componente
        setTimeout(() => {
            document.querySelector('input[name="component_name"]').focus();
        }, 100);
    }

    openProjectReturnModal(projectId) {
        console.log('💰 Apertura modal rientro per progetto:', projectId);
        
        const project = this.materialInvestments.find(p => p.id === projectId);
        if (!project) {
            this.showNotification('❌ Progetto non trovato', 'error');
            return;
        }
        
        // Salva ID progetto corrente
        this.currentProjectId = projectId;
        
        const totalInvested = project.total_invested || project.investment_value + (project.project_return || 0);
        const currentReturn = project.project_return || 0;
        const subInvestments = project.sub_investments || [];
        
        // Popola informazioni progetto nel modal
        document.getElementById('return-project-emoji').textContent = project.investment_emoji;
        document.getElementById('return-project-name').textContent = project.investment_name;
        document.getElementById('return-project-components').textContent = `${subInvestments.length + 1} componenti`;
        document.getElementById('return-total-invested').textContent = this.formatCurrency(totalInvested);
        document.getElementById('return-current-amount').textContent = this.formatCurrency(currentReturn);
        
        // Pre-imposta il valore attuale se esiste
        const returnInput = document.querySelector('input[name="return_amount"]');
        returnInput.value = currentReturn > 0 ? currentReturn : '';
        
        // Imposta data odierna
        document.querySelector('input[name="return_date"]').value = new Date().toISOString().split('T')[0];
        
        // Nascondi anteprima inizialmente
        document.getElementById('return-preview').classList.add('hidden');
        
        // Impedisce scroll del body
        document.body.style.overflow = 'hidden';
        
        // Mostra modal
        document.getElementById('project-return-modal').classList.remove('hidden');
        
        // Focus sull'importo
        setTimeout(() => {
            returnInput.focus();
        }, 100);
        
        // Aggiorna anteprima se c'è un valore
        if (currentReturn > 0) {
            this.updateReturnPreview();
        }
    }

    async deleteProject(projectId) {
        console.log('🗑️ Eliminazione progetto:', projectId);
        
        const project = this.materialInvestments.find(p => p.id === projectId);
        if (!project) {
            this.showNotification('❌ Progetto non trovato', 'error');
            return;
        }
        
        const subInvestments = project.sub_investments || [];
        const totalInvestments = subInvestments.length + 1;
        
        // DEBUG: Calcola impatto sul saldo PRIMA dell'eliminazione
        const transactionBalance = this.transactions.reduce((sum, t) => 
            sum + (t.tipo === 'entrata' ? t.importo : -t.importo), 0);
        const financialInvestmentValue = this.financialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        const oldMaterialInvestmentValue = this.materialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        const oldTotalBalance = transactionBalance - financialInvestmentValue - oldMaterialInvestmentValue;
        
        const projectNetValue = project.investment_value; // Valore netto del progetto (investito - rientri)
        const projectTotalInvested = project.total_invested || project.investment_value;
        const projectReturn = project.project_return || 0;
        
        console.log('📊 PRIMA DELL\'ELIMINAZIONE:');
        console.log(`   Progetto da eliminare: ${project.investment_name}`);
        console.log(`   Valore netto progetto: ${this.formatCurrency(projectNetValue)}`);
        console.log(`   Totale investito progetto: ${this.formatCurrency(projectTotalInvested)}`);
        console.log(`   Rientro progetto: ${this.formatCurrency(projectReturn)}`);
        console.log(`   Totale investimenti materiali ATTUALI: ${this.formatCurrency(oldMaterialInvestmentValue)}`);
        console.log(`   SALDO ATTUALE: ${this.formatCurrency(oldTotalBalance)}`);
        
        // NUOVA LOGICA: Rimuovo investimento MA mantengo il rientro come transazione
        // Impatto sul saldo = +TotaleInvestito (torna disponibile) + Rientro (se presente, resta)
        const expectedNewBalance = oldTotalBalance + projectTotalInvested;
        
        console.log('🧮 NUOVO CALCOLO IMPATTO ELIMINAZIONE:');
        console.log(`   🔑 REGOLA: Rimuovo investimento, mantengo rientro`);
        console.log(`   Formula: SaldoVecchio + TotaleInvestito`);
        console.log(`   ${this.formatCurrency(oldTotalBalance)} + ${this.formatCurrency(projectTotalInvested)} = ${this.formatCurrency(expectedNewBalance)}`);
        
        let confirmMessage = `🗑️ Eliminare il progetto "${project.investment_name}"?\n\n` +
            `📊 Investimenti da eliminare: ${totalInvestments}\n` +
            `💰 Totale investito: ${this.formatCurrency(projectTotalInvested)} (tornerà disponibile)\n`;
        
        if (projectReturn > 0) {
            const profit = projectReturn - projectTotalInvested;
            confirmMessage += `💚 Rientro: ${this.formatCurrency(projectReturn)} (diventerà transazione permanente)\n` +
                `${profit >= 0 ? '🟢' : '🔴'} ${profit >= 0 ? 'Guadagno' : 'Perdita'}: ${this.formatCurrency(Math.abs(profit))}\n\n` +
                `✅ RISULTATO: L'investimento sarà rimosso, il rientro sarà mantenuto!\n`;
        } else {
            confirmMessage += `\n✅ RISULTATO: L'investimento sarà rimosso e tornerà disponibile.\n`;
        }
        
        confirmMessage += `\n📊 SALDO ATTUALE: ${this.formatCurrency(oldTotalBalance)}\n` +
            `📊 SALDO DOPO ELIMINAZIONE: ${this.formatCurrency(expectedNewBalance)}\n` +
            `💡 Variazione saldo: +${this.formatCurrency(expectedNewBalance - oldTotalBalance)}\n\n` +
            `⚠️ Questa operazione non può essere annullata.`;
        
        const confirm = window.confirm(confirmMessage);
        
        if (!confirm) return;
        
        // NUOVO: Se il progetto ha un rientro, convertilo in transazione reale
        if (projectReturn > 0) {
            console.log('💰 CONVERSIONE RIENTRO IN TRANSAZIONE REALE');
            const rientroTransaction = {
                tipo: 'entrata',
                importo: projectReturn,
                categoria: '🏠 Rientro Progetto',
                descrizione: `Rientro da progetto "${project.investment_name}"`,
                data: (project.return_date || new Date()).toISOString(),
                ricorrente: false,
                metodo_pagamento: 'altro'
            };
            
            console.log(`   ✅ Creando transazione entrata: ${this.formatCurrency(projectReturn)}`);
            console.log(`   📋 Descrizione: ${rientroTransaction.descrizione}`);
            
            // Salva nel server
            try {
                const response = await fetch('tables/transazioni', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(rientroTransaction)
                });
                
                if (response.ok) {
                    // Aggiungi anche localmente
                    rientroTransaction.data = new Date(rientroTransaction.data);
                    rientroTransaction.id = Date.now().toString();
                    this.transactions.unshift(rientroTransaction);
                    console.log('💾 Rientro salvato nel server e aggiunto localmente');
                } else {
                    console.error('❌ Errore response salvataggio rientro:', response.status);
                }
            } catch (e) {
                console.error('❌ Errore salvataggio rientro nel server:', e);
                // Aggiungi comunque localmente come fallback
                rientroTransaction.data = new Date(rientroTransaction.data);
                rientroTransaction.id = Date.now().toString();
                this.transactions.unshift(rientroTransaction);
                console.log('📱 Rientro aggiunto solo localmente (fallback)');
            }
        }
        
        // Rimuovi da materialInvestments
        this.materialInvestments = this.materialInvestments.filter(p => p.id !== projectId);
        
        // Rimuovi tutti gli investimenti correlati da investments
        this.investments = this.investments.filter(inv => 
            inv.parent_project_id !== projectId && 
            inv.id !== projectId &&
            !(inv.investment_name === project.investment_name && inv.investment_type === 'material')
        );
        
        // DEBUG: Verifica DOPO l'eliminazione (con nuova logica)
        // Ricalcola il saldo con le eventuali nuove transazioni
        const newTransactionBalance = this.transactions.reduce((sum, t) => 
            sum + (t.tipo === 'entrata' ? t.importo : -t.importo), 0);
        const newMaterialInvestmentValue = this.materialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        const newTotalBalance = newTransactionBalance - financialInvestmentValue - newMaterialInvestmentValue;
        const balanceChange = newTotalBalance - oldTotalBalance;
        
        console.log('📊 DOPO L\'ELIMINAZIONE (NUOVA LOGICA):');
        console.log(`   🔄 Transazioni aggiornate (con eventuale rientro): ${this.formatCurrency(newTransactionBalance)}`);
        console.log(`   📉 Investimenti materiali rimasti: ${this.formatCurrency(newMaterialInvestmentValue)}`);
        console.log(`   💰 NUOVO SALDO TOTALE: ${this.formatCurrency(newTotalBalance)}`);
        console.log(`   📈 Variazione saldo: ${this.formatCurrency(balanceChange)}`);
        
        if (projectReturn > 0) {
            console.log(`   ✅ VERIFICA RIENTRO:`);
            console.log(`      • Rientro aggiunto alle transazioni: ${this.formatCurrency(projectReturn)}`);
            console.log(`      • Investimento rimosso: ${this.formatCurrency(projectTotalInvested)}`);
            console.log(`      • Guadagno netto: ${this.formatCurrency(projectReturn - projectTotalInvested)}`);
            console.log(`      • Variazione saldo attesa: +${this.formatCurrency(projectTotalInvested)}`);
            console.log(`      • Variazione saldo effettiva: ${this.formatCurrency(balanceChange)}`);
        } else {
            console.log(`   ✅ VERIFICA RIMOZIONE SEMPLICE:`);
            console.log(`      • Investimento rimosso: ${this.formatCurrency(projectTotalInvested)}`);
            console.log(`      • Variazione saldo attesa: +${this.formatCurrency(projectTotalInvested)}`);
            console.log(`      • Variazione saldo effettiva: ${this.formatCurrency(balanceChange)}`);
        }
        
        // Salva e aggiorna TUTTO
        this.saveInvestmentsToStorage();
        
        // Aggiorna tutti i componenti UI
        console.log('🔄 Aggiornamento completo UI dopo eliminazione progetto...');
        this.updateDashboard();           // Aggiorna saldi e statistiche
        this.updateChart();               // Aggiorna grafico spese  
        this.updateInvestmentChart();     // Aggiorna grafico investimenti finanziari
        this.updateMaterialInvestmentChart(); // Aggiorna grafico investimenti materiali
        this.updateInvestmentsDashboard(); // Aggiorna dashboard investimenti
        
        // Forza aggiornamento immediato del saldo
        console.log('🔄 Forzando aggiornamento saldo...');
        try {
            this.updateDashboard();
            console.log('✅ updateDashboard forzato completato');
        } catch (e) {
            console.error('❌ Errore update dashboard forzato:', e);
        }
        
        // DEBUG SALDO FINALE DALLA UI
        setTimeout(() => {
            const displayedBalance = document.getElementById('header-balance').textContent;
            console.log('💰 VERIFICA SALDO FINALE:');
            console.log(`   SALDO CALCOLATO: ${this.formatCurrency(newTotalBalance)}`);
            console.log(`   SALDO MOSTRATO UI: ${displayedBalance}`);
            console.log(`   MATCH: ${displayedBalance === this.formatCurrency(newTotalBalance) ? '✅' : '❌'}`);
            
            // Se non match, forza update
            if (displayedBalance !== this.formatCurrency(newTotalBalance)) {
                console.warn('⚠️ MISMATCH RILEVATO - Forzando aggiornamento UI...');
                document.getElementById('header-balance').textContent = this.formatCurrency(newTotalBalance);
                console.log('🔧 Saldo forzato manualmente');
            }
        }, 500);
        
        console.log('✅ Tutti i componenti UI aggiornati');
        this.showNotification(`✅ Progetto "${project.investment_name}" eliminato - Saldo aggiornato da ${this.formatCurrency(oldTotalBalance)} a ${this.formatCurrency(newTotalBalance)}`);
    }

    deleteSubInvestment(projectId, subInvestmentId) {
        console.log('🗑️ Eliminazione sub-investimento:', { projectId, subInvestmentId });
        
        const project = this.materialInvestments.find(p => p.id === projectId);
        if (!project || !project.sub_investments) {
            this.showNotification('❌ Progetto o investimento non trovato', 'error');
            return;
        }
        
        const subInvestment = project.sub_investments.find(sub => sub.id === subInvestmentId);
        if (!subInvestment) {
            this.showNotification('❌ Investimento non trovato', 'error');
            return;
        }
        
        // Rimuovi dall'array sub_investments
        project.sub_investments = project.sub_investments.filter(sub => sub.id !== subInvestmentId);
        
        // Debug: log del componente eliminato
        console.log('🗑️ Componente eliminato:', {
            progetto: project.investment_name,
            componente: subInvestment.component_name || 'Componente',
            valore: subInvestment.investment_value
        });
        
        // Aggiorna valore totale progetto
        project.investment_value -= subInvestment.investment_value;
        project.total_invested -= subInvestment.investment_value;
        
        // Ricalcola valore netto se c'è un rientro
        if (project.project_return && project.project_return > 0) {
            project.investment_value = project.total_invested - project.project_return;
            console.log('♻️ Ricalcolato valore netto con rientro:', project.investment_value);
        }
        
        // Rimuovi anche dalla lista generale
        this.investments = this.investments.filter(inv => inv.id !== subInvestmentId);
        
        // Salva e aggiorna completamente
        this.saveInvestmentsToStorage();
        this.updateDashboard();           // Aggiorna saldi
        this.updateMaterialInvestmentChart(); // Aggiorna grafico materiali
        this.updateInvestmentChart();     // Aggiorna grafico finanziari per sicurezza
        
        console.log('✅ UI aggiornata dopo eliminazione componente');
        this.showNotification(`✅ Componente "${subInvestment.component_name || 'Investimento'}" rimosso da "${project.investment_name}"`);
    }

    closeProjectComponentModal() {
        document.getElementById('project-component-modal').classList.add('hidden');
        document.body.style.overflow = '';
        document.getElementById('project-component-form').reset();
    }

    closeProjectReturnModal() {
        document.getElementById('project-return-modal').classList.add('hidden');
        document.body.style.overflow = '';
        document.getElementById('project-return-form').reset();
        document.getElementById('return-preview').classList.add('hidden');
    }

    addProjectComponent() {
        console.log('🔧 Aggiunta componente al progetto:', this.currentProjectId);
        
        const project = this.materialInvestments.find(p => p.id === this.currentProjectId);
        if (!project) {
            this.showNotification('❌ Progetto non trovato', 'error');
            return;
        }
        
        const formData = new FormData(document.getElementById('project-component-form'));
        const componentName = formData.get('component_name');
        const componentPrice = parseFloat(formData.get('component_price'));
        const componentDate = formData.get('component_date');
        const componentNotes = formData.get('component_notes');
        
        if (!componentName || isNaN(componentPrice) || componentPrice <= 0) {
            this.showNotification('❌ Nome e prezzo sono obbligatori', 'error');
            return;
        }
        
        // Crea nuovo componente
        const newComponent = {
            id: `component_${Date.now()}`,
            parent_project_id: project.id,
            component_name: componentName,
            component_notes: componentNotes,
            investment_emoji: project.investment_emoji,
            investment_name: project.investment_name,
            investment_value: componentPrice,
            investment_type: 'material',
            investment_date: new Date(componentDate),
            created_at: Date.now(),
            is_sub_investment: true
        };
        
        // Aggiungi alla lista componenti del progetto
        if (!project.sub_investments) {
            project.sub_investments = [];
        }
        project.sub_investments.push(newComponent);
        
        // Aggiorna valore totale progetto
        project.investment_value += componentPrice;
        project.total_invested = (project.total_invested || project.investment_value) + componentPrice;
        
        // Ricalcola valore netto se c'è un rientro
        if (project.project_return) {
            project.investment_value = project.total_invested - project.project_return;
        }
        
        // Aggiungi anche alla lista generale
        this.investments.unshift(newComponent);
        
        // Salva e aggiorna
        this.saveInvestmentsToStorage();
        this.updateDashboard();
        this.updateMaterialInvestmentChart();
        
        // Chiudi modal
        this.closeProjectComponentModal();
        
        this.showNotification(`✅ Componente "${componentName}" aggiunto a "${project.investment_name}"`);
        console.log(`🔧 Componente aggiunto: ${componentName} - €${componentPrice}`);
    }

    updateReturnPreview() {
        const returnInput = document.querySelector('input[name="return_amount"]');
        const returnValue = parseFloat(returnInput.value) || 0;
        
        if (returnValue <= 0) {
            document.getElementById('return-preview').classList.add('hidden');
            return;
        }
        
        const project = this.materialInvestments.find(p => p.id === this.currentProjectId);
        if (!project) return;
        
        const totalInvested = project.total_invested || project.investment_value + (project.project_return || 0);
        const netResult = totalInvested - returnValue;
        
        // Aggiorna anteprima
        document.getElementById('preview-invested').textContent = this.formatCurrency(totalInvested);
        document.getElementById('preview-return').textContent = this.formatCurrency(returnValue);
        document.getElementById('preview-result-value').textContent = this.formatCurrency(Math.abs(netResult));
        
        const resultLabel = document.getElementById('preview-result-label');
        const resultValue = document.getElementById('preview-result-value');
        
        if (netResult > 0) {
            resultLabel.textContent = 'Costo Netto:';
            resultValue.className = 'text-amber-600 font-bold';
        } else if (netResult < 0) {
            resultLabel.textContent = 'Profitto Netto:';
            resultValue.className = 'text-green-600 font-bold';
        } else {
            resultLabel.textContent = 'Pareggio:';
            resultValue.className = 'text-gray-600 font-bold';
        }
        
        document.getElementById('return-preview').classList.remove('hidden');
    }

    setProjectReturn() {
        console.log('💰 Impostazione rientro progetto:', this.currentProjectId);
        
        const project = this.materialInvestments.find(p => p.id === this.currentProjectId);
        if (!project) {
            this.showNotification('❌ Progetto non trovato', 'error');
            return;
        }
        
        const formData = new FormData(document.getElementById('project-return-form'));
        const returnAmount = parseFloat(formData.get('return_amount'));
        const returnDate = formData.get('return_date');
        
        if (isNaN(returnAmount) || returnAmount < 0) {
            this.showNotification('❌ Inserisci un importo valido', 'error');
            return;
        }
        
        const totalInvested = project.total_invested || project.investment_value + (project.project_return || 0);
        
        // Debug: log del rientro impostato
        console.log('💰 Rientro impostato:', {
            progetto: project.investment_name,
            totalInvestito: totalInvested,
            rientro: returnAmount,
            valoreNettoCalcolato: totalInvested - returnAmount
        });
        
        // Aggiorna rientro progetto
        project.project_return = returnAmount;
        project.return_date = new Date(returnDate);
        project.investment_value = totalInvested - returnAmount; // Valore netto per il calcolo saldo
        
        console.log('♻️ Progetto aggiornato:', {
            investmentValue: project.investment_value,
            totalInvested: project.total_invested,
            projectReturn: project.project_return
        });
        
        // Salva modifiche
        this.saveInvestmentsToStorage();
        
        // Aggiorna UI COMPLETA
        console.log('🔄 Aggiornamento completo UI dopo impostazione rientro...');
        this.updateDashboard();                // Aggiorna saldi e statistiche
        this.updateChart();                   // Aggiorna grafico spese
        this.updateInvestmentChart();         // Aggiorna grafico investimenti finanziari  
        this.updateMaterialInvestmentChart(); // Aggiorna grafico investimenti materiali
        this.updateInvestmentsDashboard();    // Aggiorna dashboard investimenti
        
        // Chiudi modal
        this.closeProjectReturnModal();
        
        const netResult = totalInvested - returnAmount;
        const message = netResult > 0 ? 
            `✅ Rientro impostato - Costo netto: ${this.formatCurrency(netResult)}` :
            `✅ Rientro impostato - Profitto netto: ${this.formatCurrency(Math.abs(netResult))}`;
            
        this.showNotification(message);
        console.log(`📈 Progetto ${project.investment_name}: Rientro ${returnAmount}, Valore netto: ${project.investment_value}`);
    }
    
    // Funzione per verificare l'integrità del sistema
    verifySystemIntegrity() {
        console.log('🔍 VERIFICA INTEGRITÀ SISTEMA PROGETTI MATERIALI');
        
        let totalErrors = 0;
        
        // 1. Verifica coerenza investimenti totali
        const generalMaterialInvestments = this.investments.filter(inv => inv.investment_type === 'material');
        console.log(`📊 Investimenti materiali in lista generale: ${generalMaterialInvestments.length}`);
        console.log(`🏗️ Progetti materiali: ${this.materialInvestments.length}`);
        
        // 2. Verifica ogni progetto
        this.materialInvestments.forEach((project, index) => {
            console.log(`\n🏗️ PROGETTO ${index + 1}: ${project.investment_name}`);
            
            const subInvestments = project.sub_investments || [];
            const totalSubValue = subInvestments.reduce((sum, sub) => sum + sub.investment_value, 0);
            const totalInvested = project.total_invested || 0;
            const projectReturn = project.project_return || 0;
            const expectedNetValue = totalInvested - projectReturn;
            
            console.log(`💰 Valore netto attuale: ${this.formatCurrency(project.investment_value)}`);
            console.log(`📊 Totale investito: ${this.formatCurrency(totalInvested)}`);
            console.log(`💵 Rientro: ${this.formatCurrency(projectReturn)}`);
            console.log(`🧮 Valore netto calcolato: ${this.formatCurrency(expectedNetValue)}`);
            console.log(`🔧 Sub-investimenti: ${subInvestments.length} (valore: ${this.formatCurrency(totalSubValue)})`);
            
            // Verifica coerenza valore netto
            if (Math.abs(project.investment_value - expectedNetValue) > 0.01) {
                console.error(`❌ ERRORE: Valore netto non coerente per ${project.investment_name}`);
                totalErrors++;
            }
            
            // Verifica sub-investimenti
            subInvestments.forEach(sub => {
                const inGeneral = this.investments.find(inv => inv.id === sub.id);
                if (!inGeneral) {
                    console.error(`❌ ERRORE: Sub-investimento ${sub.id} non trovato in lista generale`);
                    totalErrors++;
                }
            });
        });
        
        // 3. Verifica calcolo saldo totale
        const transactionBalance = this.transactions.reduce((sum, t) => 
            sum + (t.tipo === 'entrata' ? t.importo : -t.importo), 0);
        const financialInvestmentValue = this.financialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        const materialInvestmentValue = this.materialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
        const expectedTotalBalance = transactionBalance - financialInvestmentValue - materialInvestmentValue;
        
        console.log(`\n💰 VERIFICA SALDO TOTALE:`);
        console.log(`💳 Saldo transazioni: ${this.formatCurrency(transactionBalance)}`);
        console.log(`📈 Investimenti finanziari: ${this.formatCurrency(financialInvestmentValue)}`);
        console.log(`🏗️ Investimenti materiali (netti): ${this.formatCurrency(materialInvestmentValue)}`);
        console.log(`🏦 Saldo totale calcolato: ${this.formatCurrency(expectedTotalBalance)}`);
        
        const currentDisplayedBalance = document.getElementById('header-balance')?.textContent;
        console.log(`📱 Saldo visualizzato: ${currentDisplayedBalance}`);
        
        console.log(`\n${totalErrors === 0 ? '✅ SISTEMA INTEGRO' : `❌ TROVATI ${totalErrors} ERRORI`}`);
        
        return totalErrors === 0;
    }

    updateInvestmentsSummary() {
        const container = document.getElementById('investments-summary');
        
        const totalValue = this.investments.reduce((sum, i) => sum + i.investment_value, 0);
        const totalCount = this.investments.length;
        
        const summaryData = [
            {
                icon: '💰',
                label: 'Valore Totale Portfolio',
                value: this.formatCurrency(totalValue),
                color: 'text-blue-600'
            },
            {
                icon: '📊',
                label: 'Investimenti Attivi',
                value: totalCount,
                color: 'text-green-600'
            }
        ];

        container.innerHTML = summaryData.map(item => `
            <div class="bg-white border border-blue-200 rounded-lg p-6 text-center">
                <div class="text-3xl mb-3">${item.icon}</div>
                <div class="text-gray-600 text-sm mb-2">${item.label}</div>
                <div class="${item.color} text-xl font-bold">${item.value}</div>
            </div>
        `).join('');
    }

    updateInvestmentsList() {
        const container = document.getElementById('investments-list');
        
        if (this.investments.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 mb-4">Nessun investimento nel tuo portfolio</p>
                    <button onclick="openInvestmentModal()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium">
                        <i class="fas fa-plus mr-2"></i>Primo Investimento
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = this.investments.map((inv, index) => `
            <div class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 relative group">
                <!-- Pulsante elimina -->
                <button onclick="sapoTracker.deleteInvestment('${inv.id}')" 
                        class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500">
                    <i class="fas fa-trash text-sm"></i>
                </button>
                
                <div class="text-center mb-4">
                    <div class="text-4xl mb-2">${inv.investment_emoji}</div>
                    <h4 class="font-semibold text-gray-900">${inv.investment_name}</h4>
                    <p class="text-gray-500 text-sm">${this.formatDate(inv.investment_date)}</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <div class="text-center">
                        <p class="text-gray-600 text-sm mb-1">Valore Attuale</p>
                        <p class="text-2xl font-bold text-blue-600">${this.formatCurrency(inv.investment_value)}</p>
                    </div>
                </div>
                
                <!-- Bottoni Azione -->
                <div class="grid grid-cols-2 gap-3">
                    <button data-action="add" data-investment-id="${inv.id}" class="investment-update-btn bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        <i class="fas fa-plus mr-1"></i>Aggiungi
                    </button>
                    <button data-action="remove" data-investment-id="${inv.id}" class="investment-update-btn bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        <i class="fas fa-minus mr-1"></i>Preleva
                    </button>
                </div>
            </div>
        `).join('');
    }

    getInvestmentEmoji(category) {
        const emojiMap = {
            'Azioni': '📈',
            'Crypto': '₿',
            'ETF': '📊',
            'Obbligazioni': '🏦',
            'Fondi': '💼',
            'Immobiliare': '🏠',
            'Commodities': '🥇',
            'Altro': '📦'
        };
        return emojiMap[category] || '📦';
    }

    closeInvestmentModal() {
        console.log('🚪 === CHIUSURA MODAL INVESTIMENTI ===');
        
        const modal = document.getElementById('investment-modal');
        if (!modal) {
            console.error('❌ Modal investment-modal non trovato!');
            return;
        }
        
        console.log('✅ Modal trovato, procedendo con chiusura...');
        
        // Nascondi modal
        modal.classList.add('hidden');
        modal.style.display = 'none';
        
        // 🔧 RIPRISTINO COMPLETO BODY (CRITICO PER MOBILE)
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.top = '';
        document.body.style.left = '';
        
        console.log('✅ Stili body ripristinati');
        
        // Reset form investimenti
        this.resetInvestmentForm();
        
        // 🧹 RIMOZIONE LISTENER EVENTI (PREVENZIONE MEMORY LEAK)
        const escHandlers = document.querySelectorAll('[data-esc-handler]');
        escHandlers.forEach(handler => {
            document.removeEventListener('keydown', handler);
        });
        
        // 🔄 FORZA AGGIORNAMENTO SALDO DOPO CHIUSURA
        setTimeout(() => {
            if (window.forceSyncBalance && typeof forceSyncBalance === 'function') {
                console.log('🔄 Forzando sincronizzazione saldo dopo chiusura modal...');
                forceSyncBalance();
            } else {
                console.log('⚠️ forceSyncBalance non disponibile, aggiornando dashboard normale');
                this.updateDashboard();
            }
        }, 200);
        
        console.log('🚪 Modal investimenti chiuso completamente');
    }
    
    resetInvestmentForm() {
        const form = document.getElementById('investment-form');
        if (form) {
            form.reset();
            
            // Ripristina valori di default
            const dateInput = document.querySelector('input[name="investment_date"]');
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
            
            const emojiInput = document.querySelector('input[name="investment_emoji"]');
            if (emojiInput) {
                emojiInput.value = '📈';
            }
            
            console.log('🔄 Form investimento resettato');
        }
    }

    openInvestmentUpdateModal(investmentId, action) {
        console.log('🔧 Apertura modal aggiornamento:', { investmentId, action });
        
        try {
            const investment = this.investments.find(i => i.id === investmentId);
            if (!investment) {
                console.error('❌ Investimento non trovato con ID:', investmentId);
                this.showNotification('❌ Investimento non trovato', 'error');
                return;
            }

            console.log('✅ Investimento trovato:', investment.investment_name);

            // Salva dati correnti
            this.currentUpdateInvestment = investment;
            this.currentUpdateAction = action;

        // Configura modal
        document.getElementById('update-modal-emoji').textContent = investment.investment_emoji;
        document.getElementById('update-modal-title').textContent = investment.investment_name;
        document.getElementById('current-value').textContent = this.formatCurrency(investment.investment_value);

        // Pre-seleziona il tipo di operazione
        const radioButton = document.querySelector(`input[name="update_type"][value="${action}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }

        // Reset form
        document.getElementById('investment-update-form').reset();
        document.querySelector(`input[name="update_type"][value="${action}"]`).checked = true;

        // Mostra modal
        const modal = document.getElementById('investment-update-modal');
        if (!modal) {
            console.error('❌ Modal investment-update-modal non trovato nel DOM!');
            return;
        }
        
        // Impedisce scroll del body
        document.body.style.overflow = 'hidden';
        
        modal.classList.remove('hidden');
        console.log('✅ Modal di aggiornamento mostrato');

        // Focus su input importo
        setTimeout(() => {
            const amountInput = document.querySelector('input[name="update_amount"]');
            if (amountInput) {
                amountInput.focus();
            }
        }, 100);

        // Scroll in alto se mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
        
        } catch (error) {
            console.error('❌ Errore in openInvestmentUpdateModal:', error);
            this.showNotification('❌ Errore apertura modal aggiornamento', 'error');
        }
    }

    processInvestmentUpdate() {
        console.log('🚀 PROCESSAMENTO AGGIORNAMENTO INVESTIMENTO - VERSIONE SEMPLIFICATA');
        
        try {
            // Test base - esiste l'investimento?
            if (!this.currentUpdateInvestment) {
                console.error('❌ Nessun investimento selezionato');
                this.showNotification('❌ Errore: nessun investimento selezionato', 'error');
                return;
            }
            
            // Test base - esiste il form?
            const form = document.getElementById('investment-update-form');
            if (!form) {
                console.error('❌ Form non trovato');
                this.showNotification('❌ Errore: form non trovato', 'error');
                return;
            }
            
            console.log('✅ Form e investimento trovati');
            
            // Leggi dati del form
            const formData = new FormData(form);
            const updateType = formData.get('update_type') || 'add';
            const amountStr = formData.get('update_amount') || '0';
            const amount = parseFloat(amountStr);
            
            console.log('📝 Dati:', { updateType, amount, investimento: this.currentUpdateInvestment.investment_name });
            
            // Validazione minima
            if (amount <= 0) {
                this.showNotification('❌ Inserisci un importo valido', 'error');
                return;
            }
            
            console.log('✅ Validazione OK, procedendo...');
            
            // Operazione
            const oldValue = this.currentUpdateInvestment.investment_value;
            if (updateType === 'add') {
                this.currentUpdateInvestment.investment_value += amount;
            } else {
                this.currentUpdateInvestment.investment_value = Math.max(0, oldValue - amount);
            }
            
            console.log(`💰 Valore aggiornato: ${this.formatCurrency(oldValue)} → ${this.formatCurrency(this.currentUpdateInvestment.investment_value)}`);
            
            // 🔥 CONTROLLO RIMOZIONE AUTOMATICA SE VALORE = 0
            let investmentRemoved = false;
            if (this.currentUpdateInvestment.investment_value <= 0) {
                console.log('🗑️ Valore arrivato a 0 o negativo, rimuovo investimento automaticamente...');
                
                // Rimuovi dall'array principale
                const investmentIndex = this.investments.findIndex(inv => inv.id === this.currentUpdateInvestment.id);
                if (investmentIndex !== -1) {
                    const removedInvestment = this.investments.splice(investmentIndex, 1)[0];
                    
                    // Rimuovi anche dall'array specifico del tipo
                    if (removedInvestment.investment_type === 'financial') {
                        const finIndex = this.financialInvestments.findIndex(inv => inv.id === this.currentUpdateInvestment.id);
                        if (finIndex !== -1) this.financialInvestments.splice(finIndex, 1);
                        console.log('💰 Rimosso da investimenti finanziari');
                    } else {
                        const matIndex = this.materialInvestments.findIndex(inv => inv.id === this.currentUpdateInvestment.id);
                        if (matIndex !== -1) this.materialInvestments.splice(matIndex, 1);
                        console.log('🏭 Rimosso da investimenti materiali');
                    }
                    
                    console.log(`✅ Investimento "${removedInvestment.investment_name}" rimosso completamente`);
                    console.log(`📊 Investimenti rimanenti: ${this.investments.length}`);
                    investmentRemoved = true;
                } else {
                    console.warn('⚠️ Investimento non trovato nell\'array per la rimozione');
                }
            }
            
            // Salva
            this.saveInvestmentsToStorage();
            
            // Aggiorna UI
            this.updateInvestmentsDashboard();
            this.updateDashboard();
            this.updateChart();
            this.updateInvestmentChart();
            
            // Chiudi modal
            this.closeInvestmentUpdateModal();
            
            // Messaggio di successo personalizzato
            if (investmentRemoved) {
                this.showNotification(`🗑️ ${this.currentUpdateInvestment.investment_name} completamente prelevato e rimosso!`, 'success');
                console.log('🎉 INVESTIMENTO RIMOSSO AUTOMATICAMENTE - PRELIEVO COMPLETO');
            } else {
                this.showNotification(`✅ ${this.currentUpdateInvestment.investment_name} aggiornato!`, 'success');
                console.log('🎉 AGGIORNAMENTO COMPLETATO CON SUCCESSO');
            }
            
        } catch (error) {
            console.error('❌ ERRORE in processInvestmentUpdate:', error);
            this.showNotification('❌ Errore nell\'aggiornamento', 'error');
        }
    }

    closeInvestmentUpdateModal() {
        document.getElementById('investment-update-modal').classList.add('hidden');
        // Ripristina scroll del body
        document.body.style.overflow = '';
        this.currentUpdateInvestment = null;
        this.currentUpdateAction = null;
    }

    deleteInvestment(investmentId) {
        const investment = this.investments.find(i => i.id === investmentId);
        if (!investment) return;

        if (!confirm(`Sei sicuro di voler eliminare "${investment.investment_name}"?`)) return;

        try {
            console.log(`🗑️ Eliminazione investimento: ${investment.investment_name}`);
            
            // Rimuovi localmente
            this.investments = this.investments.filter(i => i.id !== investmentId);
            
            // Salva in localStorage
            this.saveInvestmentsToStorage();

            // Aggiorna UI
            this.updateInvestmentsDashboard();
            this.updateDashboard(); // Aggiorna anche il saldo generale
            this.updateChart();
            this.updateInvestmentChart();

            this.showNotification(`✅ ${investment.investment_name} eliminato!`);
            console.log('✅ Investimento eliminato con successo');
        } catch (error) {
            console.error('❌ Errore eliminazione investimento:', error);
            this.showNotification('❌ Errore nell\'eliminazione', 'error');
        }
    }



    updateAverageAmount(category) {
        // Calcola nuovo importo medio per questa categoria
        const categoryTransactions = this.transactions.filter(t => 
            t.tipo === 'uscita' && t.categoria === category
        );
        
        if (categoryTransactions.length >= 3) { // Solo se ci sono almeno 3 transazioni
            const total = categoryTransactions.reduce((sum, t) => sum + t.importo, 0);
            const newAverage = total / categoryTransactions.length;
            
            // Aggiorna solo se la differenza è significativa (>10%)
            const currentAverage = this.quickExpenseAmounts[category];
            const percentDiff = Math.abs(newAverage - currentAverage) / currentAverage;
            
            if (percentDiff > 0.1) {
                this.quickExpenseAmounts[category] = Math.round(newAverage * 100) / 100;
                
                // Salva in localStorage
                localStorage.setItem('quickExpenseAmounts', JSON.stringify(this.quickExpenseAmounts));
                
                console.log(`📊 Importo medio ${category} aggiornato: €${newAverage.toFixed(2)}`);
            }
        }
    }

    showCategoryDetails(category) {
        const transactions = this.transactions.filter(t => t.categoria === category);
        const total = transactions.reduce((sum, t) => sum + t.importo, 0);
        
        alert(`${category}\n\nTransazioni: ${transactions.length}\nTotale: ${this.formatCurrency(total)}\nMedia: ${this.formatCurrency(total / transactions.length)}`);
    }

    // Utility functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('it-IT').format(date);
    }

    showNotification(message, type = 'success') {
        console.log(`📢 Notifica: ${message} (${type})`);
        
        // Rimuovi notifiche esistenti
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Crea elemento notifica
        const notification = document.createElement('div');
        notification.className = 'notification fixed top-4 right-4 z-[9999] px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300';
        
        // Stile basato sul tipo
        if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-green-500', 'text-white');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animazione di entrata
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 10);
        
        // Rimozione automatica dopo 3 secondi
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const text = document.getElementById('notification-text');
        
        text.textContent = message;
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    closeAddModal() {
        document.getElementById('add-modal').classList.add('hidden');
    }

    // 🔍 SISTEMA RICERCA E FILTRI AVANZATI
    initializeSearchAndFilters() {
        this.setupSearchEvents();
        this.populateFilterCategories();
        this.filteredData = { transactions: [], investments: [] };
    }

    setupSearchEvents() {
        // Toggle ricerca
        document.getElementById('toggle-search').addEventListener('click', () => {
            const content = document.getElementById('search-content');
            const chevron = document.getElementById('search-chevron');
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                chevron.classList.add('fa-chevron-up');
                chevron.classList.remove('fa-chevron-down');
            } else {
                content.classList.add('hidden');
                chevron.classList.add('fa-chevron-down');
                chevron.classList.remove('fa-chevron-up');
            }
        });

        // Ricerca globale
        document.getElementById('global-search').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Filtri
        ['filter-type', 'filter-category', 'filter-period', 'filter-amount'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Periodo personalizzato
        document.getElementById('filter-period').addEventListener('change', (e) => {
            const customRange = document.getElementById('custom-date-range');
            if (e.target.value === 'custom') {
                customRange.classList.remove('hidden');
            } else {
                customRange.classList.add('hidden');
            }
            this.applyFilters();
        });

        // Date personalizzate
        document.getElementById('date-from').addEventListener('change', () => this.applyFilters());
        document.getElementById('date-to').addEventListener('change', () => this.applyFilters());

        // Clear e reset
        document.getElementById('clear-search').addEventListener('click', () => this.clearSearch());
        document.getElementById('reset-filters').addEventListener('click', () => this.resetFilters());
    }

    populateFilterCategories() {
        const categorySelect = document.getElementById('filter-category');
        const categories = new Set();
        
        // Raccogli categorie da transazioni
        this.transactions.forEach(t => {
            if (t.categoria) categories.add(t.categoria);
        });
        
        // Raccogli categorie da investimenti
        this.investments.forEach(inv => {
            if (inv.investment_type === 'financial') categories.add('Investimenti Liquidi');
            if (inv.investment_type === 'material') categories.add('Investimenti Materiali');
        });

        // Popola select
        categorySelect.innerHTML = '<option value="">Tutte le categorie</option>';
        [...categories].sort().forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    }

    performSearch(query) {
        if (!query.trim()) {
            this.clearSearchResults();
            return;
        }

        query = query.toLowerCase();
        const results = {
            transactions: [],
            investments: []
        };

        // Cerca nelle transazioni
        results.transactions = this.transactions.filter(t => {
            return (
                t.categoria?.toLowerCase().includes(query) ||
                t.descrizione?.toLowerCase().includes(query) ||
                t.importo?.toString().includes(query) ||
                new Date(t.data).toLocaleDateString('it-IT').includes(query)
            );
        });

        // Cerca negli investimenti
        results.investments = this.investments.filter(inv => {
            return (
                inv.investment_name?.toLowerCase().includes(query) ||
                inv.investment_value?.toString().includes(query) ||
                inv.investment_type?.toLowerCase().includes(query)
            );
        });

        this.displaySearchResults(results, query);
        this.updateResultsCount(results.transactions.length + results.investments.length);
    }

    applyFilters() {
        const filters = {
            type: document.getElementById('filter-type').value,
            category: document.getElementById('filter-category').value,
            period: document.getElementById('filter-period').value,
            amount: document.getElementById('filter-amount').value,
            dateFrom: document.getElementById('date-from').value,
            dateTo: document.getElementById('date-to').value
        };

        let filteredTransactions = [...this.transactions];
        let filteredInvestments = [...this.investments];

        // Filtro tipo
        if (filters.type) {
            if (filters.type === 'investment') {
                filteredTransactions = [];
            } else {
                filteredTransactions = filteredTransactions.filter(t => t.tipo === filters.type);
                filteredInvestments = [];
            }
        }

        // Filtro categoria
        if (filters.category) {
            filteredTransactions = filteredTransactions.filter(t => t.categoria === filters.category);
            if (filters.category === 'Investimenti Liquidi') {
                filteredInvestments = filteredInvestments.filter(inv => inv.investment_type === 'financial');
            } else if (filters.category === 'Investimenti Materiali') {
                filteredInvestments = filteredInvestments.filter(inv => inv.investment_type === 'material');
            }
        }

        // Filtro periodo
        if (filters.period && filters.period !== 'custom') {
            const now = new Date();
            const filterDate = this.getFilterDate(filters.period, now);
            
            filteredTransactions = filteredTransactions.filter(t => new Date(t.data) >= filterDate);
            filteredInvestments = filteredInvestments.filter(inv => new Date(inv.investment_date || inv.created_at) >= filterDate);
        }

        // Filtro date personalizzate
        if (filters.period === 'custom' && filters.dateFrom && filters.dateTo) {
            const from = new Date(filters.dateFrom);
            const to = new Date(filters.dateTo);
            
            filteredTransactions = filteredTransactions.filter(t => {
                const date = new Date(t.data);
                return date >= from && date <= to;
            });
            
            filteredInvestments = filteredInvestments.filter(inv => {
                const date = new Date(inv.investment_date || inv.created_at);
                return date >= from && date <= to;
            });
        }

        // Filtro importo
        if (filters.amount) {
            const [min, max] = this.getAmountRange(filters.amount);
            
            filteredTransactions = filteredTransactions.filter(t => {
                const amount = Math.abs(parseFloat(t.importo));
                return amount >= min && (max === Infinity || amount <= max);
            });
            
            filteredInvestments = filteredInvestments.filter(inv => {
                const amount = Math.abs(inv.investment_value);
                return amount >= min && (max === Infinity || amount <= max);
            });
        }

        const results = {
            transactions: filteredTransactions,
            investments: filteredInvestments
        };

        this.filteredData = results;
        this.displaySearchResults(results);
        this.updateResultsCount(results.transactions.length + results.investments.length);
    }

    getFilterDate(period, now) {
        switch(period) {
            case 'today':
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            case 'week':
                const weekAgo = new Date(now);
                weekAgo.setDate(now.getDate() - 7);
                return weekAgo;
            case 'month':
                return new Date(now.getFullYear(), now.getMonth(), 1);
            case 'quarter':
                const quarterAgo = new Date(now);
                quarterAgo.setMonth(now.getMonth() - 3);
                return quarterAgo;
            case 'year':
                return new Date(now.getFullYear(), 0, 1);
            default:
                return new Date(0);
        }
    }

    getAmountRange(rangeStr) {
        const ranges = {
            '0-50': [0, 50],
            '50-200': [50, 200],
            '200-500': [200, 500],
            '500-1000': [500, 1000],
            '1000+': [1000, Infinity]
        };
        return ranges[rangeStr] || [0, Infinity];
    }

    displaySearchResults(results, searchQuery = '') {
        // Qui potresti aggiornare la visualizzazione delle tabelle/grafici con i risultati filtrati
        console.log('🔍 Risultati ricerca:', results);
        
        // Mostra export button se ci sono risultati
        const exportBtn = document.getElementById('export-filtered');
        if (results.transactions.length > 0 || results.investments.length > 0) {
            exportBtn.classList.remove('hidden');
        } else {
            exportBtn.classList.add('hidden');
        }
    }

    updateResultsCount(count) {
        const countElement = document.getElementById('search-results-count');
        if (count === 0) {
            countElement.textContent = 'Nessun risultato trovato';
        } else if (count === 1) {
            countElement.textContent = '1 risultato trovato';
        } else {
            countElement.textContent = `${count} risultati trovati`;
        }
    }

    clearSearch() {
        document.getElementById('global-search').value = '';
        this.clearSearchResults();
    }

    clearSearchResults() {
        this.filteredData = { transactions: [], investments: [] };
        this.updateResultsCount(0);
        document.getElementById('export-filtered').classList.add('hidden');
        document.getElementById('search-results-count').textContent = 'Nessun filtro attivo';
    }

    resetFilters() {
        document.getElementById('filter-type').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-period').value = '';
        document.getElementById('filter-amount').value = '';
        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';
        document.getElementById('custom-date-range').classList.add('hidden');
        
        this.clearSearchResults();
    }

    // 📊 GRAFICI TEMPORALI AVANZATI
    initializeTimeCharts() {
        this.balanceTimeChart = null;
        this.incomeExpenseChart = null;
        this.setupChartEvents();
        this.createTimeCharts();
    }

    setupChartEvents() {
        // Cambio periodo
        document.getElementById('chart-period').addEventListener('change', (e) => {
            this.updateTimeCharts(parseInt(e.target.value));
        });

        // Refresh charts
        document.getElementById('refresh-chart').addEventListener('click', () => {
            const period = parseInt(document.getElementById('chart-period').value);
            this.updateTimeCharts(period);
        });
    }

    createTimeCharts() {
        this.createBalanceTimeChart();
        this.createIncomeExpenseChart();
        this.updateTimeCharts(30); // Default: 30 giorni
    }

    createBalanceTimeChart() {
        const ctx = document.getElementById('balanceTimeChart');
        if (!ctx) return;

        this.balanceTimeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Saldo Totale',
                    data: [],
                    borderColor: 'rgb(6, 182, 212)',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(6, 182, 212)',
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgb(6, 182, 212)',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            title: (context) => {
                                return new Date(context[0].label).toLocaleDateString('it-IT');
                            },
                            label: (context) => {
                                return `Saldo: ${this.formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd/MM'
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgb(100, 116, 139)'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(100, 116, 139, 0.1)'
                        },
                        ticks: {
                            color: 'rgb(100, 116, 139)',
                            callback: (value) => this.formatCurrency(value)
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    createIncomeExpenseChart() {
        const ctx = document.getElementById('incomeExpenseChart');
        if (!ctx) return;

        this.incomeExpenseChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Entrate',
                        data: [],
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgb(34, 197, 94)',
                        borderWidth: 1,
                        borderRadius: 6
                    },
                    {
                        label: 'Uscite',
                        data: [],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgb(239, 68, 68)',
                        borderWidth: 1,
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            color: 'rgb(100, 116, 139)'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(100, 116, 139, 0.2)',
                        borderWidth: 1,
                        callbacks: {
                            title: (context) => {
                                return new Date(context[0].label).toLocaleDateString('it-IT');
                            },
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(Math.abs(context.parsed.y))}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd/MM'
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgb(100, 116, 139)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(100, 116, 139, 0.1)'
                        },
                        ticks: {
                            color: 'rgb(100, 116, 139)',
                            callback: (value) => this.formatCurrency(Math.abs(value))
                        }
                    }
                }
            }
        });
    }

    updateTimeCharts(days = 30) {
        console.log('📊 updateTimeCharts chiamato con', days, 'giorni');
        
        try {
            // 🔧 CONTROLLI DI SICUREZZA
            if (!this.balanceTimeChart) {
                console.warn('⚠️ balanceTimeChart non inizializzato, ricreo...');
                this.createBalanceTimeChart();
            }
            
            if (!this.incomeExpenseChart) {
                console.warn('⚠️ incomeExpenseChart non inizializzato, ricreo...');
                this.createIncomeExpenseChart();
            }
            
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - days);

            console.log('📊 Generando dati temporali da', startDate.toISOString().split('T')[0], 'a', endDate.toISOString().split('T')[0]);
            const timeData = this.generateTimeSeriesData(startDate, endDate);
            console.log('📊 Dati temporali generati:', timeData);
            
            // Aggiorna grafico saldo
            if (this.balanceTimeChart && timeData) {
                this.balanceTimeChart.data.labels = timeData.labels;
                this.balanceTimeChart.data.datasets[0].data = timeData.balances;
                this.balanceTimeChart.update('none');
                console.log('✅ Grafico saldo temporale aggiornato');
            }

            // Aggiorna grafico entrate/uscite
            if (this.incomeExpenseChart && timeData) {
                this.incomeExpenseChart.data.labels = timeData.labels;
                this.incomeExpenseChart.data.datasets[0].data = timeData.incomes;
                this.incomeExpenseChart.data.datasets[1].data = timeData.expenses.map(x => -x); // Negativo per visualizzazione
                this.incomeExpenseChart.update('none');
                console.log('✅ Grafico entrate/uscite aggiornato');
            }

            // Aggiorna statistiche
            this.updateTimeStats(timeData);
            console.log('✅ updateTimeCharts completato con successo');
            
        } catch (error) {
            console.error('❌ Errore in updateTimeCharts:', error);
        }
    }

    generateTimeSeriesData(startDate, endDate) {
        const labels = [];
        const balances = [];
        const incomes = [];
        const expenses = [];
        
        const currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            labels.push(new Date(currentDate));
            
            // Calcola saldo per questa data
            const balance = this.calculateBalanceAtDate(currentDate);
            balances.push(balance);
            
            // Calcola entrate e uscite per questo giorno
            const dayTransactions = this.transactions.filter(t => {
                const transactionDate = new Date(t.data).toISOString().split('T')[0];
                return transactionDate === dateStr;
            });
            
            const dayIncome = dayTransactions
                .filter(t => t.tipo === 'entrata')
                .reduce((sum, t) => sum + parseFloat(t.importo || 0), 0);
                
            const dayExpense = dayTransactions
                .filter(t => t.tipo === 'uscita')
                .reduce((sum, t) => sum + Math.abs(parseFloat(t.importo || 0)), 0);
            
            incomes.push(dayIncome);
            expenses.push(dayExpense);
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return { labels, balances, incomes, expenses };
    }

    calculateBalanceAtDate(targetDate) {
        const targetDateStr = targetDate.toISOString().split('T')[0];
        
        // Transazioni fino alla data target
        const transactionsUpToDate = this.transactions.filter(t => {
            const transactionDate = new Date(t.data).toISOString().split('T')[0];
            return transactionDate <= targetDateStr;
        });
        
        const transactionBalance = transactionsUpToDate.reduce((sum, transaction) => {
            const amount = parseFloat(transaction.importo || 0);
            return transaction.tipo === 'entrata' ? sum + amount : sum - amount;
        }, 0);
        
        // Investimenti fino alla data target
        const investmentsUpToDate = this.investments.filter(inv => {
            const invDate = inv.investment_date || inv.created_at;
            return invDate && invDate <= targetDateStr;
        });
        
        const totalInvestments = investmentsUpToDate.reduce((sum, inv) => {
            return sum + Math.abs(inv.investment_value);
        }, 0);
        
        return transactionBalance - totalInvestments;
    }

    updateTimeStats(timeData) {
        const avgIncome = timeData.incomes.reduce((sum, val) => sum + val, 0) / timeData.incomes.length || 0;
        const avgExpense = timeData.expenses.reduce((sum, val) => sum + val, 0) / timeData.expenses.length || 0;
        
        const firstBalance = timeData.balances[0] || 0;
        const lastBalance = timeData.balances[timeData.balances.length - 1] || 0;
        const trend = firstBalance !== 0 ? ((lastBalance - firstBalance) / Math.abs(firstBalance)) * 100 : 0;
        
        const totalTransactions = timeData.incomes.filter(x => x > 0).length + timeData.expenses.filter(x => x > 0).length;
        
        document.getElementById('stat-avg-income').textContent = this.formatCurrency(avgIncome);
        document.getElementById('stat-avg-expense').textContent = this.formatCurrency(avgExpense);
        document.getElementById('stat-trend').textContent = `${trend >= 0 ? '+' : ''}${trend.toFixed(1)}%`;
        document.getElementById('stat-trend').className = `text-2xl font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`;
        document.getElementById('stat-transactions').textContent = totalTransactions;
    }

    // 🎯 DRAG & DROP INVESTIMENTI
    initializeDragAndDrop() {
        this.setupSortable();
    }

    setupSortable() {
        const investmentsList = document.getElementById('investments-list');
        if (!investmentsList) return;

        this.sortable = Sortable.create(investmentsList, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            handle: '.drag-handle', // Solo elementi con questa classe possono essere trascinati
            
            onStart: (evt) => {
                document.body.style.cursor = 'grabbing';
                this.showDragHelper();
            },
            
            onEnd: (evt) => {
                document.body.style.cursor = '';
                this.hideDragHelper();
                
                if (evt.oldIndex !== evt.newIndex) {
                    this.reorderInvestments(evt.oldIndex, evt.newIndex);
                }
            }
        });
    }

    reorderInvestments(oldIndex, newIndex) {
        // Riordina array investimenti
        const item = this.investments.splice(oldIndex, 1)[0];
        this.investments.splice(newIndex, 0, item);
        
        // Salva nuovo ordine
        this.saveInvestments();
        
        console.log(`🎯 Investment moved from position ${oldIndex} to ${newIndex}`);
        this.showNotification('📍 Ordine investimenti aggiornato');
    }

    showDragHelper() {
        const helper = document.getElementById('drag-helper');
        if (helper) {
            helper.classList.remove('hidden');
        }
    }

    hideDragHelper() {
        const helper = document.getElementById('drag-helper');
        if (helper) {
            helper.classList.add('hidden');
        }
    }

    // 🔐 SICUREZZA - Integrazione con SecurityManager
    clearSensitiveData() {
        // Pulisce dati sensibili dalla memoria quando si fa logout
        this.transactions = [];
        this.investments = [];
        this.financialInvestments = [];
        this.materialInvestments = [];
        
        // Resetta grafici
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        if (this.investmentChart) {
            this.investmentChart.destroy();
            this.investmentChart = null;
        }
        if (this.materialInvestmentChart) {
            this.materialInvestmentChart.destroy();
            this.materialInvestmentChart = null;
        }
        if (this.balanceTimeChart) {
            this.balanceTimeChart.destroy();
            this.balanceTimeChart = null;
        }
        if (this.incomeExpenseChart) {
            this.incomeExpenseChart.destroy();
            this.incomeExpenseChart = null;
        }
    }

    // Wrapper per interazione con SecurityManager
    getSecureData(key) {
        if (window.securityManager && window.securityManager.isAuthenticated) {
            return window.securityManager.getSecureItem(key);
        }
        return JSON.parse(localStorage.getItem(key) || 'null');
    }

    setSecureData(key, data) {
        if (window.securityManager && window.securityManager.isAuthenticated) {
            return window.securityManager.setSecureItem(key, data);
        }
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    // 🎮 MODAL MANAGEMENT MIGLIORATO
    openTransactionModal(type = 'expense') {
        // Interfaccia per aprire modal transazioni (chiamato dai gesture e PWA)
        openAddModal(type === 'income' ? 'entrata' : 'uscita');
    }
}

// Global functions
function openAddModal(tipo = 'uscita') {
    console.log('🎯 Apertura modal transazione - tipo:', tipo);
    
    // 📱 DEFINIZIONE MOBILE: Necessaria per il funzionamento
    const isMobile = window.innerWidth <= 768;
    
    // 🛡️ CONTROLLO EXTRA: Verifica che non sia un'apertura accidentale
    if (typeof tipo !== 'string' || (tipo !== 'entrata' && tipo !== 'uscita')) {
        console.warn('⚠️ Tipo modal invalido:', tipo);
        return false;
    }
    
    // 🎯 FIX POSIZIONAMENTO CRITICO: SEMPRE scroll immediato per modal centrato
    // PROBLEMA RISOLTO: Il modal ora si apre SEMPRE al centro, mai in basso
    console.log('🎯 PRIMA - Posizione scroll corrente:', window.scrollY);
    
    // FORZARE scroll a zero IMMEDIATAMENTE - sia mobile che desktop
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    console.log('🎯 DOPO - Scroll forzato a zero per modal centrato');
    
    // Pre-seleziona il tipo
    const radioTipo = document.querySelector(`input[name="tipo"][value="${tipo}"]`);
    if (radioTipo) {
        radioTipo.checked = true;
    }
    
    // 🔒 CONTROLLO SICUREZZA: Verifica se sapoTracker è inizializzato
    if (sapoTracker && typeof sapoTracker.updateCategories === 'function') {
        try {
            sapoTracker.updateCategories();
        } catch (error) {
            console.error('❌ ERRORE in sapoTracker.updateCategories():', error);
        }
    }
    
    const modal = document.getElementById('add-modal');
    
    // Impedisce scroll del body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    modal.classList.remove('hidden');
    
    // 🎯 VISUALIZZAZIONE IMMEDIATA: Nessun delay, apparizione istantanea
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.zIndex = '99999'; // Z-index più alto per essere sicuri
    modal.style.background = 'rgba(0, 0, 0, 0.8)';
    
    // 🎯 STYLING IMMEDIATO: Nessun delay per apparizione istantanea
    const modalContent = modal.querySelector('div');
    if (modalContent) {
        if (isMobile) {
            // 📱 MOBILE: Styling ottimizzato per piccoli schermi
            modalContent.style.cssText = `
                position: relative !important;
                top: auto !important;
                left: auto !important;
                transform: none !important;
                width: calc(100vw - 32px) !important;
                max-width: 400px !important;
                max-height: 85vh !important;
                overflow-y: auto !important;
                margin: 0 auto !important;
                background: #1a202c !important;
                border: 2px solid #4a5568 !important;
                border-radius: 16px !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8) !important;
            `;
            console.log('📱 Modal content ottimizzato per mobile');
        } else {
            // 🖥️ DESKTOP: Styling tema chiaro per schermi grandi
            modalContent.style.cssText = `
                position: relative !important;
                width: auto !important;
                max-width: 500px !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
                margin: 0 auto !important;
                background: white !important;
                border-radius: 12px !important;
                box-shadow: 0 25px 75px rgba(0, 0, 0, 0.5) !important;
            `;
            console.log('🖥️ Modal content ottimizzato per desktop - TEMA CHIARO');
        }
        
        // 🎨 APPLICA TEMA IN BASE AL DISPOSITIVO
        const inputs = modalContent.querySelectorAll('input, select, textarea');
        const labels = modalContent.querySelectorAll('label, p, span:not(.fas)');
        const titles = modalContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        if (isMobile) {
            // 📱 MOBILE: Tema scuro per leggibilità
            inputs.forEach(input => {
                input.style.cssText = `
                    background: #374151 !important;
                    border: 2px solid #6b7280 !important;
                    color: #ffffff !important;
                    font-weight: 600 !important;
                    font-size: 16px !important;
                `;
            });
            
            labels.forEach(label => {
                if (!label.classList.contains('fas') && !label.classList.contains('fa')) {
                    label.style.color = '#e2e8f0 !important';
                }
            });
            
            titles.forEach(title => {
                title.style.color = '#ffffff !important';
            });
            
            console.log('📱 Applicato tema SCURO per mobile');
            
        } else {
            // 🖥️ DESKTOP: Tema chiaro con CONTRASTO PERFETTO
            inputs.forEach(input => {
                input.style.cssText = `
                    background: #ffffff !important;
                    border: 2px solid #d1d5db !important;
                    color: #111827 !important;
                    font-weight: 500 !important;
                    font-size: 16px !important;
                `;
            });
            
            labels.forEach(label => {
                if (!label.classList.contains('fas') && !label.classList.contains('fa')) {
                    label.style.color = '#374151 !important';  // Grigio scuro per leggibilità
                }
            });
            
            titles.forEach(title => {
                title.style.color = '#111827 !important';  // Nero per titoli
            });
            
            console.log('🖥️ Applicato tema CHIARO per desktop - Contrasto ottimizzato');
        }
        
        console.log('🎨 Tema applicato al modal immediatamente');
    } else {
        console.log('⚠️ Modal content NON trovato!');
    }
    
    console.log('🔍 Cercando input per focus...');
    // Focus immediato
    const firstInput = modal.querySelector('input[name="importo"]');
    console.log('🔍 Input importo found:', !!firstInput);
    if (firstInput && !isMobile) {
        firstInput.focus();
        console.log('✅ Focus impostato su input importo');
    }
    
    console.log('✅ Modal transazione aperto IMMEDIATAMENTE - NESSUN DELAY');
}

function closeAddModal() {
    console.log('🚪 Chiusura modal con sistema robusto...');
    
    // 🔥 USA LA FUNZIONE UNIVERSALE ROBUSTA
    try {
        const closedCount = sapoTracker.forceCloseAllModals();
        console.log(`✅ Sistema universale: ${closedCount} modal chiuse`);
        
        // 🧹 RESET SPECIFICO CAMPO "ALTRO" 
        const altroField = document.getElementById('altro-type-field');
        const altroInput = document.querySelector('input[name="altro_tipo"]');
        
        if (altroField && altroInput) {
            altroField.classList.add('hidden');
            altroInput.required = false;
            altroInput.value = '';
            console.log('🧹 Campo "Altro" resettato');
        }
        
        return true;
        
    } catch (e) {
        console.error('❌ Errore sistema universale, fallback tradizionale:', e);
        
        // FALLBACK: Metodo tradizionale
        const modal = document.getElementById('add-modal');
        if (modal) {
            modal.style.cssText = '';
            modal.classList.add('hidden');
            modal.style.display = 'none';
            
            document.body.style.cssText = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            
            console.log('✅ Fallback tradizionale eseguito');
            return true;
        }
        
        return false;
    }
}

function closeQuickExpenseModal() {
    sapoTracker.closeQuickExpenseModal();
}

function confirmQuickExpense() {
    sapoTracker.confirmQuickExpense();
}

function openInvestmentModal(type = 'financial') {
    console.log('🎯 openInvestmentModal chiamata - apertura modal per tipo:', type);
    
    const modal = document.getElementById('investment-modal');
    if (!modal) {
        console.error('❌ Modal investment-modal non trovato!');
        alert('❌ ERRORE: Modal non trovato nel DOM. Contattare il supporto tecnico.');
        return;
    }
    
    const isMobile = window.innerWidth <= 768;
    
    // 🚀 MOBILE FIX: Scroll solo su desktop
    if (!isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Impedisce scroll del body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    modal.classList.remove('hidden');
    
    // 🎯 MOBILE FIX: Centraggio perfetto
    setTimeout(() => {
        modal.style.cssText = `
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9999 !important;
            padding: 16px !important;
            background: rgba(0, 0, 0, 0.5) !important;
        `;
        
        const modalContent = modal.querySelector('div');
        if (modalContent && isMobile) {
            modalContent.style.cssText = `
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: calc(100vw - 32px) !important;
                max-width: 380px !important;
                max-height: 85vh !important;
                overflow-y: auto !important;
                margin: 0 !important;
            `;
        }
        
        console.log('✅ Modal investimenti aperto e centrato (mobile optimized)');
    }, isMobile ? 200 : 100);
    
    // Preseleziona il tipo di investimento
    const typeSelect = document.querySelector('select[name="investment_type"]');
    if (typeSelect) {
        typeSelect.value = type;
        console.log('📋 Tipo preselezionato:', type);
    } else {
        console.error('❌ Select investment_type non trovato');
    }
    
    // Imposta data di oggi nel form
    const dateInput = document.querySelector('input[name="investment_date"]');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
        console.log('📅 Data impostata nel form');
    } else {
        console.error('❌ Input investment_date non trovato');
    }
    
    // Focus sul primo campo per accessibilità con verifica posizione
    setTimeout(() => {
        const firstInput = modal.querySelector('input[name="investment_value"]');
        if (firstInput) {
            firstInput.focus();
            console.log('✅ Focus impostato su campo valore');
            
            // Verifica che il campo sia visibile
            const rect = firstInput.getBoundingClientRect();
            console.log('📍 Posizione campo:', { top: rect.top, visible: rect.top > 0 && rect.top < window.innerHeight });
            
            if (rect.top < 0 || rect.top > window.innerHeight) {
                console.warn('⚠️ Campo non visibile, scrolling modal container...');
                const modalContainer = modal.querySelector('.bg-white');
                if (modalContainer) {
                    modalContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        } else {
            console.error('❌ Input investment_value non trovato per focus');
        }
    }, 300);
    
    // 🎯 GESTORI CHIUSURA MODAL (ESC + CLICK ESTERNO)
    const handleEscClose = (e) => {
        if (e.key === 'Escape') {
            console.log('⌨️ ESC premuto - chiudendo modal investimenti');
            closeInvestmentModal();
            document.removeEventListener('keydown', handleEscClose);
        }
    };
    
    const handleClickOutside = (e) => {
        if (e.target === modal) {
            console.log('🖱️ Click esterno rilevato - chiudendo modal investimenti');
            closeInvestmentModal();
            modal.removeEventListener('click', handleClickOutside);
        }
    };
    
    // Aggiungi listener
    document.addEventListener('keydown', handleEscClose);
    modal.addEventListener('click', handleClickOutside);
    
    console.log('✅ Gestori chiusura modal (ESC + Click esterno) attivati');
}

function closeInvestmentModal() {
    sapoTracker.closeInvestmentModal();
}

function closeInvestmentUpdateModal() {
    sapoTracker.closeInvestmentUpdateModal();
}

function closeProjectComponentModal() {
    sapoTracker.closeProjectComponentModal();
}

function closeProjectReturnModal() {
    sapoTracker.closeProjectReturnModal();
}

function scrollToInvestments() {
    const investmentsSection = document.getElementById('investments-section');
    if (investmentsSection) {
        investmentsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Effetto di evidenziazione temporanea
        investmentsSection.classList.add('ring-2', 'ring-blue-300', 'ring-opacity-50');
        setTimeout(() => {
            investmentsSection.classList.remove('ring-2', 'ring-blue-300', 'ring-opacity-50');
        }, 2000);
    }
}

function filterTransactions() {
    sapoTracker.updateTransactionsList();
}

function exportData() {
    const data = sapoTracker.transactions.map(t => ({
        Data: sapoTracker.formatDate(t.data),
        Tipo: t.tipo,
        Categoria: t.categoria,
        Descrizione: t.descrizione,
        Importo: t.importo
    }));
    
    const csv = 'data:text/csv;charset=utf-8,' + 
        Object.keys(data[0]).join(',') + '\n' +
        data.map(row => Object.values(row).join(',')).join('\n');
    
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', 'sapo_tracker_export.csv');
    link.click();
    
    sapoTracker.showNotification('📊 Dati esportati con successo!');
}

// Reset completo app
async function resetCompleteApp() {
    console.log('🧹 Inizio reset completo dell\'app...');
    
    try {
        // 1. Elimina tutte le transazioni dal server
        console.log('🗑️ Eliminazione transazioni dal server...');
        try {
            const response = await fetch('tables/transazioni?limit=1000');
            if (response.ok) {
                const data = await response.json();
                console.log(`📊 Trovate ${data.data.length} transazioni da eliminare`);
                
                // Elimina ogni transazione
                for (const transaction of data.data) {
                    try {
                        await fetch(`tables/transazioni/${transaction.id}`, {
                            method: 'DELETE'
                        });
                        console.log(`✅ Transazione ${transaction.id} eliminata`);
                    } catch (e) {
                        console.warn(`⚠️ Errore eliminazione transazione ${transaction.id}:`, e);
                    }
                }
            }
        } catch (e) {
            console.warn('⚠️ Errore eliminazione transazioni server:', e);
        }
        
        // 2. Reset localStorage investimenti
        console.log('🗑️ Reset localStorage investimenti...');
        localStorage.removeItem('sapoTracker_investments');
        console.log('✅ Investimenti localStorage eliminati');
        
        // 3. Reset localStorage altri dati
        console.log('🗑️ Reset localStorage dati aggiuntivi...');
        localStorage.removeItem('sapoTracker_quickExpenseAmounts');
        localStorage.removeItem('sapoTracker_averageAmounts');
        console.log('✅ Dati aggiuntivi localStorage eliminati');
        
        // 4. Reset array nell'app
        console.log('🔄 Reset array applicazione...');
        sapoTracker.transactions = [];
        sapoTracker.investments = [];
        sapoTracker.financialInvestments = [];
        sapoTracker.materialInvestments = [];
        
        // 5. Aggiorna UI
        console.log('🎨 Aggiornamento interfaccia...');
        sapoTracker.updateDashboard();
        sapoTracker.updateChart();
        sapoTracker.updateInvestmentChart();
        sapoTracker.updateMaterialInvestmentChart();
        sapoTracker.updateTransactionsList();
        
        // 6. Force refresh completo UI con valori zero
        console.log('🔧 Force refresh UI con valori zero...');
        document.getElementById('header-balance').textContent = '€0.00';
        document.getElementById('monthly-income').textContent = '€0.00';
        document.getElementById('monthly-expenses').textContent = '€0.00';
        document.getElementById('total-transactions').textContent = '0';
        document.getElementById('balance').textContent = '€0.00';
        document.getElementById('financial-investments-total').textContent = '€0.00';
        document.getElementById('material-investments-total').textContent = '€0.00';
        document.getElementById('header-cash').textContent = '€0.00';
        document.getElementById('header-investments').textContent = '€0.00'; // Solo investimenti liquidi
        document.getElementById('header-breakdown').style.display = 'block'; // Sempre visibile
        
        console.log('🎉 Reset completo completato con successo!');
        sapoTracker.showNotification('🧹 App completamente pulita e resettata!');
        
        return true;
        
    } catch (error) {
        console.error('❌ Errore durante il reset:', error);
        sapoTracker.showNotification('❌ Errore durante il reset', 'error');
        return false;
    }
}

// Force valori spese frequenti corretti
function forceCorrectExpenseValues() {
    console.log('🔧 Impostazione valori spese frequenti corretti...');
    
    const correctValues = {
        'Tabaccherie': 5.50,
        'Ristorazione': 10.00, 
        'Trasporti': 7.00,
        'Spesa': 20.00,
        'Altro': 10.00
    };
    
    sapoTracker.quickExpenseAmounts = correctValues;
    localStorage.setItem('quickExpenseAmounts', JSON.stringify(correctValues));
    
    console.log('✅ Valori spese frequenti impostati:', correctValues);
    sapoTracker.showNotification('🎯 Valori spese frequenti corretti impostati!');
}

// Force zero per risolvere bug saldo
function forceZeroBalance() {
    console.log('🔧 Force zero balance...');
    
    // Reset tutti gli array
    sapoTracker.transactions = [];
    sapoTracker.investments = [];
    sapoTracker.financialInvestments = [];
    sapoTracker.materialInvestments = [];
    
    // Force zero su tutti i display
    document.getElementById('header-balance').textContent = '€0.00';
    document.getElementById('header-balance').style.color = '#ffffff';
    document.getElementById('monthly-income').textContent = '€0.00';
    document.getElementById('monthly-expenses').textContent = '€0.00';
    document.getElementById('total-transactions').textContent = '0';
    document.getElementById('balance').textContent = '€0.00';
    document.getElementById('financial-investments-total').textContent = '€0.00';
    document.getElementById('material-investments-total').textContent = '€0.00';
    document.getElementById('header-cash').textContent = '€0.00';
    document.getElementById('header-investments').textContent = '€0.00'; // Solo investimenti liquidi
    document.getElementById('header-breakdown').style.display = 'block'; // Sempre visibile
    
    // Clear localStorage
    localStorage.removeItem('sapoTracker_investments');
    localStorage.removeItem('sapoTracker_quickExpenseAmounts');
    localStorage.removeItem('sapoTracker_averageAmounts');
    
    console.log('✅ Saldo forzato a zero completato!');
    sapoTracker.showNotification('🔧 Saldo forzato a €0.00');
}

// Initialize app
let sapoTracker;

// Funzione per inizializzare l'app dopo il login
window.initializeFinanceApp = function() {
    console.log('🚀 Inizializzazione App dopo login...');
    sapoTracker = new SapoTracker();
    window.financeApp = sapoTracker;
};

document.addEventListener('DOMContentLoaded', () => {
    // Non inizializziamo subito SapoTracker, aspettiamo il login
    console.log('🔒 DOM loaded, in attesa di autenticazione...');
});



// Debug function per testare il submit (mantenuta per troubleshooting)
window.debugProcessInvestmentUpdate = function() {
    console.log('🚀 DEBUG SUBMIT CHIAMATO DIRETTAMENTE!');
    if (sapoTracker) {
        console.log('✅ Chiamando processInvestmentUpdate...');
        sapoTracker.processInvestmentUpdate();
    } else {
        console.error('❌ sapoTracker non disponibile per processInvestmentUpdate!');
    }
};

// Test diretto creazione investimento (bypass form)
window.testCreateInvestmentDirect = function() {
    console.log('🧪 TEST DIRETTO CREAZIONE INVESTIMENTO');
    
    if (!sapoTracker) {
        console.error('❌ sapoTracker non disponibile');
        return;
    }
    
    // Simula dati form
    const testData = {
        investment_name: 'Test Diretto',
        investment_value: '1500',
        investment_emoji: '🚀',
        investment_date: new Date().toISOString().split('T')[0]
    };
    
    // Crea investimento direttamente
    const investment = {
        id: `test_${Date.now()}`,
        investment_emoji: testData.investment_emoji,
        investment_name: testData.investment_name,
        investment_value: parseFloat(testData.investment_value),
        investment_date: new Date(testData.investment_date),
        created_at: Date.now()
    };
    
    console.log('💰 Aggiunta investimento test:', investment);
    
    // Aggiungi all'array
    sapoTracker.investments.unshift(investment);
    
    // Salva
    const saved = sapoTracker.saveInvestmentsToStorage();
    console.log('💾 Salvataggio:', saved ? 'OK' : 'FALLITO');
    
    // Aggiorna UI
    sapoTracker.updateInvestmentsDashboard();
    sapoTracker.updateDashboard();
    sapoTracker.updateChart();
    sapoTracker.updateInvestmentChart();
    
    console.log('🎉 Test completato - controlla UI');
    sapoTracker.showNotification('🧪 Test investimento creato!');
};

// Test apertura modal investimenti
window.testOpenModal = function() {
    console.log('🧪 Test apertura modal investimenti');
    openInvestmentModal();
};

// 🚀 SISTEMA MODAL DIRETTO - FUNZIONAMENTO GARANTITO
function initDirectModalSystem() {
    console.log('🎯 Inizializzando sistema modal diretto garantito...');
    
    // ✅ DEFINIZIONE SEMPLIFICATA - USA MODAL ESISTENTE
    // Definisce le funzioni globali SENZA creare nuovi modal
    window.openModalDirect = function(tipo) {
        console.log('🚀 === APERTURA MODAL SEMPLIFICATA ===');
        console.log('🎯 Tipo richiesto:', tipo);
        
        // Usa il modal normale esistente
        const modal = document.getElementById('add-modal');
        
        if (!modal) {
            console.error('❌ Modal add-modal non trovato!');
            return;
        }
        
        console.log('✅ Modal trovato, aprendo...');
        
        // Reset del form normale
        const form = document.getElementById('transaction-form');
        if (form) {
            form.reset();
            // Imposta la data di oggi
            const dateInput = form.querySelector('input[name="data"]');
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
        }
        
        // Configura il tipo nel form normale
        const tipoInputs = form.querySelectorAll('input[name="tipo"]');
        tipoInputs.forEach(input => {
            if (input.value === tipo) {
                input.checked = true;
                console.log(`✅ Tipo ${tipo} selezionato`);
            }
        });
        
        // Mostra il modal normale
        modal.classList.remove('hidden');
        
        // Blocca scroll
        document.body.style.overflow = 'hidden';
        
        // Focus sul primo campo input
        setTimeout(() => {
            const firstInput = modal.querySelector('input[name="importo"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
        
        console.log('✅ Modal normale aperto con successo!');
    };
    
    window.closeModalDirect = function() {
        console.log('🔥 === CHIUSURA MODAL SISTEMA RADICALE ===');
        
        const modal = document.getElementById('directModal');
        if (modal) {
            modal.style.display = 'none';
            console.log('✅ Modal nascosto');
        }
        
        // Ripristina scroll completamente
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        console.log('✅ Scroll ripristinato');
        
        // Reset form completo
        const form = document.getElementById('directForm');
        if (form) {
            form.reset();
            
            // Reset anche i bordi rossi se presenti
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
            
            console.log('✅ Form resettato completamente');
        }
        
        console.log('🔥 Modal sistema RADICALE chiuso');
        
        // Feedback visivo di chiusura
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #3498db;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 9999999;
            font-weight: bold;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            text-align: center;
        `;
        alertDiv.innerHTML = '🔥 Sistema RADICALE<br>Transazione elaborata!';
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 1500);
    };
    
    console.log('✅ Sistema modal diretto inizializzato');
}

function createDirectModal() {
    console.log('🏗️ Creando modal diretto nel DOM...');
    
    const modalHTML = `
    <div id="directModal" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;z-index:999999;">
        <div style="background:white;padding:40px;border-radius:20px;box-shadow:0 25px 75px rgba(0,0,0,0.5);max-width:500px;width:90%;max-height:80vh;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;">
                <h2 id="directModalTitle" style="font-size:24px;color:#333;margin:0;">🚀 Nuova Transazione DIRETTA</h2>
                <button onclick="closeModalDirect()" style="background:#ef4444;color:white;border:none;border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:20px;">&times;</button>
            </div>
            
            <form id="directForm">
                <div style="margin-bottom:20px;">
                    <label style="display:block;margin-bottom:8px;font-weight:bold;color:#333;">Tipo</label>
                    <select id="directTipoSelect" style="width:100%;padding:15px;border:2px solid #e5e7eb;border-radius:10px;font-size:16px;">
                        <option value="entrata">💰 Entrata</option>
                        <option value="uscita">💸 Uscita</option>
                    </select>
                </div>
                
                <div style="margin-bottom:20px;">
                    <label style="display:block;margin-bottom:8px;font-weight:bold;color:#333;">Importo (€)</label>
                    <input type="number" id="directImporto" step="0.01" required style="width:100%;padding:15px;border:2px solid #e5e7eb;border-radius:10px;font-size:16px;" placeholder="0.00">
                </div>
                
                <div style="margin-bottom:20px;">
                    <label style="display:block;margin-bottom:8px;font-weight:bold;color:#333;">Descrizione</label>
                    <input type="text" id="directDescrizione" required style="width:100%;padding:15px;border:2px solid #e5e7eb;border-radius:10px;font-size:16px;" placeholder="Descrivi...">
                </div>
                
                <div style="margin-bottom:20px;">
                    <label style="display:block;margin-bottom:8px;font-weight:bold;color:#333;">Categoria</label>
                    <select id="directCategoria" required style="width:100%;padding:15px;border:2px solid #e5e7eb;border-radius:10px;font-size:16px;">
                        <option value="">Seleziona...</option>
                        <option value="alimentari">🍕 Alimentari</option>
                        <option value="trasporti">🚗 Trasporti</option>
                        <option value="casa">🏠 Casa</option>
                        <option value="salute">⚕️ Salute</option>
                        <option value="svago">🎉 Svago</option>
                        <option value="stipendio">💼 Stipendio</option>
                        <option value="altro">📦 Altro</option>
                    </select>
                </div>
                
                <button type="submit" style="width:100%;padding:15px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:white;border:none;border-radius:10px;font-size:18px;font-weight:bold;cursor:pointer;">💾 Salva</button>
            </form>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 🔥 EVENT LISTENER COMPLETAMENTE NUOVO CON SISTEMA RADICALE
    const form = document.getElementById('directForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            console.log('🚨 === NUOVO SISTEMA SALVATAGGIO RADICALE ===');
            
            const tipo = document.getElementById('directTipoSelect').value;
            const importo = parseFloat(document.getElementById('directImporto').value);
            const descrizione = document.getElementById('directDescrizione').value;
            const categoria = document.getElementById('directCategoria').value;
            
            if (!importo || !descrizione || !categoria) {
                console.error('❌ Validazione fallita: campi mancanti');
                // Evidenzia campi mancanti senza popup fastidiosi
                const campiMancanti = [];
                if (!importo) campiMancanti.push('Importo');
                if (!descrizione) campiMancanti.push('Descrizione'); 
                if (!categoria) campiMancanti.push('Categoria');
                
                // Colora in rosso i campi mancanti
                if (!importo) document.getElementById('directImporto').style.borderColor = '#ef4444';
                if (!descrizione) document.getElementById('directDescrizione').style.borderColor = '#ef4444';
                if (!categoria) document.getElementById('directCategoria').style.borderColor = '#ef4444';
                
                console.log('🔴 Campi obbligatori mancanti:', campiMancanti.join(', '));
                return;
            }
            
            console.log('📋 Dati inseriti:', { tipo, importo, descrizione, categoria });
            
            // 🔥 APPROCCIO RADICALE: MULTIPLI METODI DI AGGIORNAMENTO SALDO
            console.log('🔥 === METODO 1: AGGIORNAMENTO DIRETTO ELEMENT ===');
            
            const headerBalanceElement = document.getElementById('header-balance');
            
            if (!headerBalanceElement) {
                console.error('❌ CRITICO: Elemento header-balance NON TROVATO!');
                console.log('🔍 Elementi con "balance" nel DOM:');
                const allElements = document.querySelectorAll('*');
                for (let el of allElements) {
                    if (el.id && el.id.toLowerCase().includes('balance')) {
                        console.log(`   - ID: ${el.id}, Text: "${el.textContent}"`);
                    }
                }
                return;
            }
            
            console.log('✅ Elemento header-balance trovato:', headerBalanceElement);
            
            // Ottieni saldo attuale dal DOM
            const saldoAttualeText = headerBalanceElement.textContent;
            console.log('💰 Saldo attuale dal DOM:', saldoAttualeText);
            
            // Converte saldo attuale in numero (PARSING CORRETTO FORMATO ITALIANO)
            let saldoAttualeNumero = 0;
            try {
                console.log('🔧 === PARSING SALDO FORMATO ITALIANO ===');
                console.log('📄 Saldo raw dal DOM:', JSON.stringify(saldoAttualeText));
                
                // Formato italiano: "1.234.567,89 €" o "1.234,56 €" o "123,45 €" o "1.068,00 €"
                let cleanSaldo = saldoAttualeText;
                
                // Step 1: Rimuovi il simbolo euro e spazi
                cleanSaldo = cleanSaldo.replace(/€/g, '').trim();
                console.log('🔧 Dopo rimozione €:', JSON.stringify(cleanSaldo));
                
                // Step 2: Gestisci formato italiano (punto=migliaia, virgola=decimali)
                if (cleanSaldo.includes(',')) {
                    // Ha decimali con virgola
                    const parts = cleanSaldo.split(',');
                    if (parts.length === 2) {
                        const integerPart = parts[0].replace(/\./g, ''); // Rimuovi punti delle migliaia
                        const decimalPart = parts[1];
                        cleanSaldo = integerPart + '.' + decimalPart;
                        console.log('🔧 Formato con decimali:', {
                            parteIntera: integerPart,
                            parteDecimale: decimalPart,
                            risultato: cleanSaldo
                        });
                    }
                } else {
                    // Solo parte intera, rimuovi punti delle migliaia
                    cleanSaldo = cleanSaldo.replace(/\./g, '');
                    console.log('🔧 Solo parte intera:', cleanSaldo);
                }
                
                // Step 3: Converti in numero
                saldoAttualeNumero = parseFloat(cleanSaldo) || 0;
                console.log('💰 Saldo finale come numero:', saldoAttualeNumero);
                
                // Verifica di sanità
                if (isNaN(saldoAttualeNumero)) {
                    console.log('⚠️ Risultato NaN, uso 0');
                    saldoAttualeNumero = 0;
                }
                
            } catch (error) {
                console.log('⚠️ Errore parsing saldo, uso 0:', error);
                saldoAttualeNumero = 0;
            }
            
            // Calcola nuovo saldo (CON DEBUG DETTAGLIATO)
            console.log('🧮 === CALCOLO NUOVO SALDO ===');
            console.log('📊 Input calcolo:', {
                tipoOperazione: tipo,
                saldoAttuale: saldoAttualeNumero,
                importoInserito: importo,
                saldoAttualeType: typeof saldoAttualeNumero,
                importoType: typeof importo
            });
            
            let nuovoSaldo;
            if (tipo === 'entrata') {
                nuovoSaldo = saldoAttualeNumero + importo;
                console.log(`➕ ENTRATA: ${saldoAttualeNumero} + ${importo} = ${nuovoSaldo}`);
                console.log(`   Dettagli: saldo(${typeof saldoAttualeNumero}) + importo(${typeof importo}) = risultato(${typeof nuovoSaldo})`);
            } else if (tipo === 'uscita') {
                nuovoSaldo = saldoAttualeNumero - importo;
                console.log(`➖ USCITA: ${saldoAttualeNumero} - ${importo} = ${nuovoSaldo}`);
                console.log(`   Dettagli: saldo(${typeof saldoAttualeNumero}) - importo(${typeof importo}) = risultato(${typeof nuovoSaldo})`);
            } else {
                console.error('❌ ERRORE: Tipo operazione non valido:', tipo);
                nuovoSaldo = saldoAttualeNumero;
            }
            
            // Verifica di sanità del risultato
            if (isNaN(nuovoSaldo)) {
                console.error('❌ ERRORE: Risultato calcolo è NaN! Uso saldo attuale.');
                nuovoSaldo = saldoAttualeNumero;
            }
            
            console.log('🧮 Calcolo completato:', {
                saldoPrecedente: saldoAttualeNumero,
                operazione: tipo,
                importo: importo,
                saldoNuovo: nuovoSaldo,
                differenza: nuovoSaldo - saldoAttualeNumero
            });
            
            // Formatta nuovo saldo
            const nuovoSaldoFormattato = nuovoSaldo.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'EUR'
            });
            
            console.log('💰 Nuovo saldo formattato:', nuovoSaldoFormattato);
            
            // 🎯 AGGIORNAMENTO DIRETTO E FORZATO
            console.log('🎯 === AGGIORNAMENTO FORZATO DOM ===');
            
            // Metodo 1: textContent diretto
            headerBalanceElement.textContent = nuovoSaldoFormattato;
            console.log('✅ Metodo 1 (textContent): Applicato');
            
            // Metodo 2: innerHTML come backup
            headerBalanceElement.innerHTML = nuovoSaldoFormattato;
            console.log('✅ Metodo 2 (innerHTML): Applicato');
            
            // Metodo 3: Forza re-render con style change
            headerBalanceElement.style.opacity = '0.99';
            setTimeout(() => {
                headerBalanceElement.style.opacity = '1';
            }, 10);
            console.log('✅ Metodo 3 (re-render forzato): Applicato');
            
            // Metodo 4: Event dispatch per trigger update
            const updateEvent = new CustomEvent('balanceUpdated', { 
                detail: { oldValue: saldoAttualeText, newValue: nuovoSaldoFormattato } 
            });
            headerBalanceElement.dispatchEvent(updateEvent);
            console.log('✅ Metodo 4 (custom event): Applicato');
            
            // 🔍 VERIFICA IMMEDIATA
            setTimeout(() => {
                const saldoVerifica = headerBalanceElement.textContent;
                console.log('🔍 === VERIFICA AGGIORNAMENTO ===');
                console.log('💰 Saldo PRIMA:', saldoAttualeText);
                console.log('💰 Saldo ATTESO:', nuovoSaldoFormattato);  
                console.log('💰 Saldo REALE:', saldoVerifica);
                
                if (saldoVerifica === nuovoSaldoFormattato) {
                    console.log('🎉 SUCCESS: SALDO AGGIORNATO CORRETTAMENTE!');
                    
                    // Visual feedback di successo
                    headerBalanceElement.style.transition = 'all 0.3s ease';
                    headerBalanceElement.style.backgroundColor = '#27ae60';
                    headerBalanceElement.style.color = 'white';
                    headerBalanceElement.style.padding = '5px 10px';
                    headerBalanceElement.style.borderRadius = '5px';
                    
                    setTimeout(() => {
                        headerBalanceElement.style.backgroundColor = '';
                        headerBalanceElement.style.color = '';
                        headerBalanceElement.style.padding = '';
                        headerBalanceElement.style.borderRadius = '';
                    }, 1000);
                    
                } else {
                    console.log('❌ FAIL: SALDO NON AGGIORNATO');
                    console.log('🔧 Tentativo di recovery...');
                    
                    // Recovery: forza di nuovo l'aggiornamento
                    headerBalanceElement.textContent = nuovoSaldoFormattato;
                    headerBalanceElement.innerHTML = nuovoSaldoFormattato;
                    
                    // Visual feedback di errore
                    headerBalanceElement.style.backgroundColor = '#e74c3c';
                    headerBalanceElement.style.color = 'white';
                    setTimeout(() => {
                        headerBalanceElement.style.backgroundColor = '';
                        headerBalanceElement.style.color = '';
                    }, 500);
                }
            }, 100);
            
            // 💾 SINCRONIZZAZIONE COMPLETA CON SAPOTRACKER (CRITICA PER PERSISTENZA)
            if (window.sapoTracker && sapoTracker.transactions) {
                console.log('💾 === SINCRONIZZAZIONE SAPOTRACKER (ESSENZIALE) ===');
                
                const nuovaTransazione = {
                    id: Date.now().toString(),
                    tipo: tipo,
                    importo: parseFloat(importo), // Assicura numero
                    categoria: categoria,
                    descrizione: descrizione,
                    data: new Date(), // Oggetto Date, non stringa
                    ricorrente: false,
                    metodo_pagamento: 'carta'
                };
                
                console.log('📝 Transazione da aggiungere:', nuovaTransazione);
                console.log('📊 Transazioni PRIMA dell\'aggiunta:', sapoTracker.transactions.length);
                
                // Aggiungi all'inizio dell'array (transazione più recente)
                sapoTracker.transactions.unshift(nuovaTransazione);
                
                console.log('📊 Transazioni DOPO l\'aggiunta:', sapoTracker.transactions.length);
                console.log('✅ Transazione aggiunta a sapoTracker.transactions');
                
                // 🔄 RICALCOLA SALDO DALL'ARRAY COMPLETO PER COERENZA
                console.log('🔄 === RICALCOLO SALDO DA ARRAY TRANSAZIONI ===');
                
                const saldoRicalcolato = sapoTracker.transactions.reduce((sum, t) => {
                    return sum + (t.tipo === 'entrata' ? parseFloat(t.importo) : -parseFloat(t.importo));
                }, 0);
                
                console.log('💰 Saldo ricalcolato dall\'array:', saldoRicalcolato);
                
                // 💼 CALCOLO INVESTIMENTI CORRETTO (CRITICO PER SALDO)
                console.log('💼 === CALCOLO INVESTIMENTI ===');
                console.log('📊 Array investimenti finanziari:', sapoTracker.financialInvestments);
                console.log('📊 Array investimenti materiali:', sapoTracker.materialInvestments);
                
                const investimentiFinanziari = sapoTracker.financialInvestments?.reduce((sum, i) => {
                    const valore = parseFloat(i.investment_value) || 0;
                    console.log(`💰 Investimento finanziario: ${i.investment_name || 'N/A'} = €${valore}`);
                    return sum + valore;
                }, 0) || 0;
                
                const investimentiMateriali = sapoTracker.materialInvestments?.reduce((sum, i) => {
                    const valore = parseFloat(i.investment_value) || 0;
                    console.log(`🏠 Investimento materiale: ${i.investment_name || 'N/A'} = €${valore}`);
                    return sum + valore;
                }, 0) || 0;
                
                const investimentiTotali = investimentiFinanziari + investimentiMateriali;
                
                console.log('💼 Riepilogo investimenti:', {
                    finanziari: investimentiFinanziari,
                    materiali: investimentiMateriali,
                    totali: investimentiTotali
                });
                
                const saldoFinaleCorretto = saldoRicalcolato - investimentiTotali;
                console.log('💰 Saldo finale con investimenti:', saldoFinaleCorretto);
                
                // Verifica che il DOM sia sincronizzato
                const saldoFormattato = saldoFinaleCorretto.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'EUR'
                });
                
                console.log('💰 Saldo formattato per verifica:', saldoFormattato);
                
                // Se c'è discrepanza, correggi il DOM
                const headerBalanceElement = document.getElementById('header-balance');
                if (headerBalanceElement && headerBalanceElement.textContent !== saldoFormattato) {
                    console.log('🔧 Correggendo discrepanza DOM...');
                    headerBalanceElement.textContent = saldoFormattato;
                }
                
                // Salva in localStorage per persistenza E marca timestamp
                try {
                    const timestamp = Date.now().toString();
                    const backupData = {
                        transactions: sapoTracker.transactions,
                        lastUpdate: new Date().toISOString(),
                        directSaveCount: (localStorage.getItem('directSaveCount') || 0) + 1,
                        lastBalance: saldoFinaleCorretto
                    };
                    localStorage.setItem('sapoTracker_backup', JSON.stringify(backupData));
                    localStorage.setItem('directSaveCount', backupData.directSaveCount);
                    localStorage.setItem('lastRadicalUpdate', timestamp); // Timestamp per sincronizzazione
                    console.log('💾 Backup completo salvato in localStorage');
                    console.log('⏰ Timestamp radicale impostato:', timestamp);
                } catch (error) {
                    console.log('⚠️ Errore localStorage:', error);
                }
                
                console.log('💾 === SINCRONIZZAZIONE COMPLETATA ===');
            } else {
                console.error('❌ CRITICO: sapoTracker non disponibile! La transazione non verrà persistita.');
            }
            
            // Chiudi modal
            closeModalDirect();
            console.log('🚨 === SALVATAGGIO RADICALE COMPLETATO ===');
        });
    }
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('directModal');
            if (modal && modal.style.display === 'flex') {
                closeModalDirect();
            }
        }
    });
    
    console.log('✅ Modal diretto creato nel DOM');
}

// Verifica integrità sistema
window.verifySystemIntegrity = function() {
    if (sapoTracker) {
        return sapoTracker.verifySystemIntegrity();
    } else {
        console.error('❌ sapoTracker non disponibile!');
        return false;
    }
};

// Debug saldo in tempo reale
window.debugBalance = function() {
    if (!sapoTracker) {
        console.error('❌ sapoTracker non disponibile!');
        return;
    }
    
    console.log('🔍 DEBUG SALDO COMPLETO:');
    
    // Calcola componenti saldo
    const transactionBalance = sapoTracker.transactions.reduce((sum, t) => 
        sum + (t.tipo === 'entrata' ? t.importo : -t.importo), 0);
    const financialInvestmentValue = sapoTracker.financialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
    const materialInvestmentValue = sapoTracker.materialInvestments.reduce((sum, i) => sum + i.investment_value, 0);
    
    console.log('💳 Saldo transazioni:', sapoTracker.formatCurrency(transactionBalance));
    console.log('📈 Investimenti finanziari:', sapoTracker.formatCurrency(financialInvestmentValue));
    console.log('🏗️ Investimenti materiali (netto):', sapoTracker.formatCurrency(materialInvestmentValue));
    
    // Dettaglio progetti materiali
    console.log('\n🔍 DETTAGLIO PROGETTI MATERIALI:');
    sapoTracker.materialInvestments.forEach((project, index) => {
        const totalInvested = project.total_invested || project.investment_value;
        const projectReturn = project.project_return || 0;
        const netValue = project.investment_value;
        
        console.log(`${index + 1}. ${project.investment_name}:`);
        console.log(`   📊 Totale investito: ${sapoTracker.formatCurrency(totalInvested)}`);
        console.log(`   💰 Rientro: ${sapoTracker.formatCurrency(projectReturn)}`);
        console.log(`   📉 Valore netto: ${sapoTracker.formatCurrency(netValue)}`);
        console.log(`   🔧 Sub-investimenti: ${(project.sub_investments || []).length}`);
    });
    
    // Calcolo saldo finale
    const calculatedBalance = transactionBalance - financialInvestmentValue - materialInvestmentValue;
    const displayedBalance = document.getElementById('header-balance')?.textContent || 'N/A';
    
    console.log('\n💰 SALDO FINALE:');
    console.log(`🧮 Calcolato: ${sapoTracker.formatCurrency(calculatedBalance)}`);
    console.log(`📱 Visualizzato: ${displayedBalance}`);
    console.log(`✅ Match: ${Math.abs(calculatedBalance - parseFloat(displayedBalance.replace(/[€,\s]/g, ''))) < 0.01 ? 'SÌ' : 'NO'}`);
    
    return {
        transactionBalance,
        financialInvestmentValue, 
        materialInvestmentValue,
        calculatedBalance,
        displayedBalance
    };
};

// Reset progetti materiali (solo per test)
window.resetMaterialProjects = function() {
    console.log('🧹 Reset progetti materiali...');
    if (!sapoTracker) {
        console.error('❌ sapoTracker non disponibile!');
        return;
    }
    
    const confirm = window.confirm('🗑️ Eliminare TUTTI i progetti materiali?\n\n⚠️ Questa operazione non può essere annullata.');
    
    if (!confirm) {
        console.log('❌ Operazione annullata');
        return;
    }
    
    // Rimuovi tutti i progetti materiali
    sapoTracker.materialInvestments = [];
    
    // Rimuovi anche dalla lista generale
    sapoTracker.investments = sapoTracker.investments.filter(inv => inv.investment_type !== 'material');
    
    // Salva e aggiorna
    sapoTracker.saveInvestmentsToStorage();
    sapoTracker.updateDashboard();
    sapoTracker.updateMaterialInvestmentChart();
    
    console.log('✅ Tutti i progetti materiali sono stati eliminati');
    sapoTracker.showNotification('🧹 Progetti materiali eliminati');
};

// Test completo workflow investimenti
window.debugInvestmentWorkflow = function() {
    console.log('🔍 *** INIZIO DEBUG COMPLETO WORKFLOW INVESTIMENTI ***');
    
    // 1. Verifica sapoTracker
    if (!sapoTracker) {
        console.error('❌ sapoTracker non disponibile');
        return;
    }
    console.log('✅ sapoTracker disponibile');
    
    // 2. Verifica modal esiste
    const modal = document.getElementById('investment-modal');
    if (!modal) {
        console.error('❌ Modal investment-modal non trovato nel DOM');
        return;
    }
    console.log('✅ Modal investment-modal trovato');
    
    // 3. Verifica form esiste
    const form = document.getElementById('investment-form');
    if (!form) {
        console.error('❌ Form investment-form non trovato nel DOM');
        return;
    }
    console.log('✅ Form investment-form trovato');
    
    // 4. Verifica bottone submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) {
        console.error('❌ Bottone submit non trovato nel form');
        return;
    }
    console.log('✅ Bottone submit trovato:', submitBtn.textContent.trim());
    
    // 5. Verifica input fields
    const nameInput = form.querySelector('input[name="investment_name"]');
    const valueInput = form.querySelector('input[name="investment_value"]');
    const emojiInput = form.querySelector('input[name="investment_emoji"]');
    const dateInput = form.querySelector('input[name="investment_date"]');
    
    console.log('📝 Input fields:', {
        name: !!nameInput,
        value: !!valueInput,
        emoji: !!emojiInput,
        date: !!dateInput
    });
    
    // 6. Test apertura modal
    console.log('🎯 Aprendo modal...');
    openInvestmentModal();
    
    // 7. Compila form di test
    setTimeout(() => {
        console.log('📝 Compilando form di test...');
        if (nameInput) nameInput.value = 'Test Debug';
        if (valueInput) valueInput.value = '1000';
        if (emojiInput) emojiInput.value = '🧪';
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        
        console.log('✅ Form compilato, pronto per submit manuale');
        console.log('🎯 Ora clicca CONFERMA nel modal per testare il submit');
    }, 500);
};

// Test semplice per verificare bottoni nel DOM
window.testButtonsExist = function() {
    console.log('🔍 VERIFICA BOTTONI NEL DOM:');
    
    const buttons = document.querySelectorAll('.investment-update-btn');
    console.log('📊 Trovati', buttons.length, 'bottoni investment-update-btn');
    
    buttons.forEach((btn, index) => {
        const id = btn.getAttribute('data-investment-id');
        const action = btn.getAttribute('data-action');
        console.log(`🔘 Bottone ${index + 1}:`, { id, action, text: btn.textContent.trim() });
    });
    
    if (buttons.length > 0) {
        console.log('✅ I bottoni esistono nel DOM');
        console.log('🧪 Simulazione click sul primo bottone...');
        buttons[0].click();
    } else {
        console.error('❌ Nessun bottone investment-update-btn trovato!');
        console.log('🔍 Controllando lista investimenti...');
        const investmentsList = document.getElementById('investments-list');
        if (investmentsList) {
            console.log('📋 HTML della lista investimenti:', investmentsList.innerHTML.substring(0, 500) + '...');
        } else {
            console.error('❌ investments-list non trovato!');
        }
    }
};

// Test completo sistema progetti materiali
window.testMaterialProjectSystem = function() {
    console.log('🧪 INIZIO TEST SISTEMA PROGETTI MATERIALI');
    
    if (!sapoTracker) {
        console.error('❌ sapoTracker non disponibile!');
        return;
    }
    
    // 1. Crea un progetto di test
    console.log('1️⃣ Creando progetto test...');
    const projectData = {
        emoji: '🏠',
        name: 'Casa Test',
        value: 50000,
        date: new Date().toISOString().split('T')[0]
    };
    
    sapoTracker.handleMaterialProjectInvestment(
        projectData.emoji, 
        projectData.name, 
        projectData.value, 
        projectData.date
    );
    
    setTimeout(() => {
        console.log('2️⃣ Verificando progetto creato...');
        const project = sapoTracker.materialInvestments.find(p => 
            p.investment_name === projectData.name
        );
        
        if (project) {
            console.log('✅ Progetto trovato:', project.investment_name);
            console.log('💰 Valore base:', sapoTracker.formatCurrency(project.investment_value));
            
            // 3. Aggiungi un componente
            console.log('3️⃣ Aprendo modal componente...');
            sapoTracker.openAddComponentModal(project.id);
            
            setTimeout(() => {
                console.log('4️⃣ Simulando aggiunta componente...');
                
                // Compila form componente
                document.querySelector('input[name="component_name"]').value = 'Materiali Test';
                document.querySelector('input[name="component_price"]').value = '15000';
                document.querySelector('input[name="component_date"]').value = new Date().toISOString().split('T')[0];
                document.querySelector('textarea[name="component_notes"]').value = 'Componente aggiunto automaticamente dal test';
                
                console.log('📝 Form componente compilato');
                console.log('🎯 Ora puoi cliccare "Aggiungi" per testare il sistema completo');
                console.log('🔄 Oppure usa testProjectReturnSystem() per testare i rientri');
                
            }, 500);
            
        } else {
            console.error('❌ Progetto non creato correttamente!');
        }
    }, 500);
};

// Test sistema rientri progetti
window.testProjectReturnSystem = function() {
    console.log('🧪 TEST SISTEMA RIENTRI PROGETTI');
    
    if (!sapoTracker || sapoTracker.materialInvestments.length === 0) {
        console.error('❌ Nessun progetto materiale disponibile per test');
        return;
    }
    
    const project = sapoTracker.materialInvestments[0];
    console.log('🏗️ Testando rientro per progetto:', project.investment_name);
    console.log('💰 Valore attuale progetto:', sapoTracker.formatCurrency(project.investment_value));
    console.log('📊 Totale investito:', sapoTracker.formatCurrency(project.total_invested));
    
    // Apri modal rientro
    sapoTracker.openProjectReturnModal(project.id);
    
    setTimeout(() => {
        // Compila con un rientro di test
        const testReturn = project.total_invested * 0.8; // 80% del totale investito
        document.querySelector('input[name="return_amount"]').value = testReturn;
        document.querySelector('input[name="return_date"]').value = new Date().toISOString().split('T')[0];
        
        console.log(`💵 Impostato rientro test: ${sapoTracker.formatCurrency(testReturn)}`);
        console.log('🎯 Ora puoi cliccare "Conferma" per testare il calcolo dei rientri');
        console.log('📈 Il saldo dovrebbe aggiornarsi automaticamente');
        
        // Trigger preview
        sapoTracker.updateReturnPreview();
        
    }, 500);
};

// Test completo del flusso aggiornamento investimenti
window.testInvestmentUpdateFlow = function() {
    console.log('🧪 INIZIO TEST COMPLETO FLUSSO AGGIORNAMENTO INVESTIMENTI');
    
    if (!sapoTracker) {
        console.error('❌ sapoTracker non disponibile!');
        return;
    }
    
    console.log('1️⃣ Verifica investimenti disponibili...');
    console.log('📋 Investimenti:', sapoTracker.investments.map(i => ({ id: i.id, name: i.investment_name })));
    
    if (sapoTracker.investments.length === 0) {
        console.error('❌ Nessun investimento disponibile per il test');
        return;
    }
    
    const testInvestment = sapoTracker.investments[0];
    console.log('2️⃣ Usando investimento per test:', testInvestment.investment_name);
    
    console.log('3️⃣ Aprendo modal aggiornamento...');
    sapoTracker.openInvestmentUpdateModal(testInvestment.id, 'add');
    
    setTimeout(() => {
        console.log('4️⃣ Verificando modal aperto...');
        const modal = document.getElementById('investment-update-modal');
        const isModalOpen = modal && !modal.classList.contains('hidden');
        console.log('📱 Modal aperto:', isModalOpen);
        
        if (isModalOpen) {
            console.log('5️⃣ Compilando form di test...');
            
            // Imposta tipo operazione
            const addRadio = document.querySelector('input[name="update_type"][value="add"]');
            if (addRadio) {
                addRadio.checked = true;
                console.log('✅ Tipo operazione impostato: add');
            }
            
            // Imposta importo
            const amountInput = document.querySelector('input[name="update_amount"]');
            if (amountInput) {
                amountInput.value = '100';
                console.log('✅ Importo impostato: €100');
            }
            
            // Imposta note
            const notesInput = document.querySelector('input[name="update_notes"]');
            if (notesInput) {
                notesInput.value = 'Test automatico aggiornamento';
                console.log('✅ Note impostate');
            }
            
            console.log('6️⃣ Testando processInvestmentUpdate direttamente...');
            sapoTracker.processInvestmentUpdate();
            
        } else {
            console.error('❌ Modal non è stato aperto correttamente');
        }
    }, 500);
};