#!/bin/bash

# Mojo Solo Benefits Video Campaign - BMAD System Startup Script
# This script starts all campaign components and BMAD tracking with ULTRA-UNIQUE ports and auto browser

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Generate ultra-unique port based on project hash
PROJECT_HASH=$(echo "mybenefitsvideos$(pwd)" | shasum -a 256 | cut -c1-4)
BASE_PORT=$((0x$PROJECT_HASH + 8000))  # Convert hex to decimal, add offset
ULTRA_UNIQUE_PORT=$BASE_PORT

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${CYAN}[SUCCESS]${NC} $1"
}

print_header() {
    echo -e "${BLUE}
╔══════════════════════════════════════════════════════════════╗
║                 MOJO SOLO BENEFITS VIDEO CAMPAIGN           ║
║                    BMAD System Startup                      ║
║                 🚀 ULTRA-UNIQUE PORT: ${ULTRA_UNIQUE_PORT}           ║
╚══════════════════════════════════════════════════════════════╝${NC}"
}

# Function to find available port starting from ultra-unique base
find_available_port() {
    local port=$ULTRA_UNIQUE_PORT
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; do
        port=$((port + 1))
    done
    echo $port
}

# Function to kill any existing processes on our ports
cleanup_ports() {
    print_status "Cleaning up any existing processes on our port range..."
    for ((p=$ULTRA_UNIQUE_PORT; p<=$((ULTRA_UNIQUE_PORT+10)); p++)); do
        if lsof -Pi :$p -sTCP:LISTEN -t >/dev/null 2>&1; then
            print_warning "Killing process on port $p"
            lsof -Pi :$p -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
        fi
    done
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Python dependencies
check_python_deps() {
    print_status "Checking Python dependencies..."
    
    if ! command_exists python3; then
        print_error "Python 3 is required but not installed"
        exit 1
    fi
    
    # Check for required Python packages
    python3 -c "import sqlite3, json, datetime" 2>/dev/null || {
        print_error "Required Python packages not available"
        exit 1
    }
    
    print_status "Python dependencies OK"
}

# Function to initialize BMAD system
init_bmad() {
    print_status "Initializing BMAD tracking system..."
    
    if [ ! -f "bmad_tracking.db" ]; then
        python3 bmad_tracking_system.py --init
        print_status "BMAD system initialized with baseline metrics"
    else
        print_status "BMAD system already initialized"
    fi
}

# Function to check for deployment tools
check_deployment_tools() {
    print_status "Checking deployment tools..."
    
    if command_exists npm; then
        print_status "npm found - can deploy to Vercel/Netlify"
        return 0
    elif command_exists python3; then
        print_status "Python found - can run local server"
        return 1
    else
        print_error "No deployment tools available"
        return 2
    fi
}

# Function to launch incognito browser with cleared cache
launch_incognito_browser() {
    local url="$1"
    local port="$2"
    
    print_status "🔄 Clearing browser cache and launching incognito..."
    
    # Wait for server to be ready
    local max_attempts=30
    local attempt=1
    while [ $attempt -le $max_attempts ]; do
        if curl -s "http://localhost:$port" >/dev/null 2>&1; then
            break
        fi
        print_status "Waiting for server to start... (attempt $attempt/$max_attempts)"
        sleep 1
        attempt=$((attempt + 1))
    done
    
    # Clear browser cache (macOS specific)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # Clear Chrome cache
        rm -rf ~/Library/Caches/Google/Chrome* 2>/dev/null || true
        rm -rf ~/Library/Application\ Support/Google/Chrome/Default/Local\ Storage/* 2>/dev/null || true
        rm -rf ~/Library/Application\ Support/Google/Chrome/Default/Session\ Storage/* 2>/dev/null || true
        
        # Clear Safari cache  
        rm -rf ~/Library/Caches/com.apple.Safari/* 2>/dev/null || true
        
        print_success "✅ Browser cache cleared!"
        
        # Launch browsers in incognito/private mode
        if command_exists open; then
            # Try Chrome first (most reliable for development)
            if [ -d "/Applications/Google Chrome.app" ]; then
                print_success "🚀 Launching Chrome Incognito: $url"
                open -na "Google Chrome" --args --incognito --disable-web-security --disable-features=VizDisplayCompositor --user-data-dir="/tmp/chrome_dev_$(date +%s)" "$url" >/dev/null 2>&1 &
            # Try Safari private
            elif [ -d "/Applications/Safari.app" ]; then
                print_success "🚀 Launching Safari Private: $url"
                open -a Safari --args --private "$url" >/dev/null 2>&1 &
            # Try Firefox private
            elif [ -d "/Applications/Firefox.app" ]; then
                print_success "🚀 Launching Firefox Private: $url"
                open -a Firefox --args --private-window "$url" >/dev/null 2>&1 &
            else
                print_warning "No supported browsers found, please open: $url"
            fi
        fi
    else
        print_warning "Auto browser launch only supported on macOS. Please open: $url"
    fi
    
    # Display connection info
    echo ""
    echo -e "${PURPLE}🌐 ULTRA-UNIQUE CONNECTION INFO:${NC}"
    echo -e "${CYAN}===================================${NC}"
    echo -e "${GREEN}📱 Local Preview:${NC} $url"
    echo -e "${GREEN}🌍 Network Access:${NC} http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'your-ip'):$port"
    echo -e "${GREEN}🔧 Ultra-Unique Port:${NC} $port (generated from project hash)"
    echo -e "${GREEN}🧹 Cache Status:${NC} Cleared (fresh session)"
    echo -e "${GREEN}🔒 Browser Mode:${NC} Incognito/Private"
    echo ""
}

# Function to start Next.js template with ultra-unique port
start_template() {
    print_status "Starting Next.js template with ULTRA-UNIQUE port..."
    
    if [ ! -d "preview" ]; then
        print_error "Template directory not found. Please ensure template-must-use has been copied to preview/"
        exit 1
    fi
    
    # Cleanup any conflicting processes
    cleanup_ports
    
    # Find available port
    AVAILABLE_PORT=$(find_available_port)
    
    cd preview
    
    # Check if dependencies are installed
    if [ ! -d "node_modules" ]; then
        print_status "Installing Next.js dependencies..."
        if command_exists npm; then
            npm install --silent
        else
            print_error "npm not found. Please install Node.js and npm"
            exit 1
        fi
    fi
    
    # Set the port environment variable for Next.js
    export PORT=$AVAILABLE_PORT
    
    # Start Next.js development server in background
    print_status "Starting Next.js development server on port $AVAILABLE_PORT..."
    npm run dev -- --port $AVAILABLE_PORT >/dev/null 2>&1 &
    SERVER_PID=$!
    echo $SERVER_PID > ../.server_pid
    
    # Launch incognito browser
    launch_incognito_browser "http://localhost:$AVAILABLE_PORT" $AVAILABLE_PORT
    
    print_success "✅ Next.js template running with ULTRA-UNIQUE port $AVAILABLE_PORT"
    cd ..
}

# Function to start local development server with database health check
start_local_server() {
    print_status "Starting local development server with database health check..."
    
    # Initialize database if not exists
    if [ ! -f "bmad_tracking.db" ]; then
        print_status "Initializing database for first run..."
        init_bmad
    fi
    
    # Test database connection
    print_status "Testing database connection..."
    python3 -c "
import sqlite3
try:
    conn = sqlite3.connect('bmad_tracking.db', timeout=5.0)
    conn.execute('SELECT 1')
    conn.close()
    print('✅ Database connection successful')
except Exception as e:
    print(f'❌ Database connection failed: {e}')
    exit(1)
" || {
        print_error "Database connection failed - recreating database..."
        rm -f bmad_tracking.db
        init_bmad
    }
    
    start_template
    
    echo ""
    echo -e "${PURPLE}🚀 MOJO SOLO BENEFITS VIDEO TEMPLATE:${NC}"
    echo -e "${CYAN}====================================${NC}"
    echo -e "${GREEN}📱 Local Preview:${NC} http://localhost:$AVAILABLE_PORT"
    echo -e "${GREEN}🌍 Network Preview:${NC} http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'your-ip'):$AVAILABLE_PORT"
    echo -e "${GREEN}🔧 Ultra-Unique Port:${NC} $AVAILABLE_PORT (hash-based, no conflicts)"
    echo -e "${GREEN}🗄️ Database Status:${NC} Connected and healthy"
    echo -e "${GREEN}🧹 Browser Cache:${NC} Cleared automatically"
    echo ""
    echo -e "${BLUE}🚀 Professional Template Features:${NC}"
    echo "• Next.js 15.3.5 with React 19 components"
    echo "• OKLCH blue design system (240.325°)"
    echo "• Complete benefits video sales funnel"
    echo "• Mobile-optimized responsive design" 
    echo "• BMAD methodology optimization"
    echo "• Real-time pricing calculator"
    echo "• Advanced case study filtering"
    echo "• Contact forms with validation"
    echo "• Process timeline visualization"
    echo ""
    echo -e "${CYAN}💡 Development Info:${NC}"
    echo "• Template running in background with PID: $(cat .server_pid 2>/dev/null || echo 'N/A')"
    echo "• Use './start.sh stop' to stop development server"
    echo "• Use './start.sh status' for current metrics"
    echo "• Logs are suppressed for clean output"
    echo ""
}

# Function to deploy to production with ULTRA-UNIQUE port fallback
deploy_to_production() {
    print_status "Checking for production deployment options..."
    
    if command_exists vercel; then
        print_status "Deploying to Vercel..."
        
        # Try Vercel deployment first
        cd preview 2>/dev/null || {
            print_error "Preview directory not found"
            return 1
        }
        
        if vercel --prod 2>/dev/null; then
            print_success "✅ Deployed to Vercel successfully!"
            cd ..
            return 0
        else
            print_warning "Vercel deployment failed, falling back to local server..."
            cd ..
            start_local_server
        fi
    elif command_exists netlify; then
        print_status "Deploying to Netlify..."
        
        if netlify deploy --prod --dir=preview 2>/dev/null; then
            print_success "✅ Deployed to Netlify successfully!"
            return 0
        else
            print_warning "Netlify deployment failed, falling back to local server..."
            start_local_server
        fi
    else
        print_status "No production deployment tools found, starting local server with ULTRA-UNIQUE ports..."
        start_local_server
    fi
}

# Function to start campaign services with ULTRA-UNIQUE ports
start_campaign() {
    print_status "Starting campaign services with ULTRA-UNIQUE port system..."
    
    # Check if we're in the right directory
    if [ ! -d "preview" ]; then
        print_error "Must be run from the mybenefitsvideos directory (preview folder not found)"
        exit 1
    fi
    
    # Generate current performance report
    print_status "Generating current performance report..."
    python3 bmad_tracking_system.py --report > /dev/null 2>&1 || {
        print_warning "Could not generate performance report"
    }
    
    # Test proposal generation system
    print_status "Testing proposal generation system..."
    python3 bmad_tracking_system.py --test-proposal > /dev/null 2>&1 || {
        print_warning "Proposal system test had issues"
    }
    
    # Run BMAD analysis
    print_status "Running BMAD campaign analysis..."
    python3 bmad_analysis_current_campaign.py > /dev/null 2>&1 && {
        print_status "BMAD analysis completed successfully"
    } || {
        print_warning "BMAD analysis had issues"
    }
    
    # Start local server with ULTRA-UNIQUE ports and auto incognito browser
    print_status "🚀 Starting ULTRA-UNIQUE port system with auto incognito browser..."
    start_local_server
}

# Function to show campaign status
show_status() {
    print_status "Campaign Status Summary:"
    echo ""
    
    # Check for key files
    echo "📁 Core Components:"
    [ -f "components/PricingCalculator.tsx" ] && echo "  ✅ Enhanced Pricing Calculator" || echo "  ❌ Pricing Calculator missing"
    [ -f "campaign/automated-proposal-workflow.py" ] && echo "  ✅ ROI Proposal Generation" || echo "  ❌ Proposal system missing"
    [ -f "bmad_tracking_system.py" ] && echo "  ✅ BMAD Tracking System" || echo "  ❌ Tracking system missing"
    
    echo ""
    echo "🗄️ Data Systems:"
    [ -f "bmad_tracking.db" ] && echo "  ✅ Performance Database" || echo "  ❌ Database not initialized"
    [ -d "bmad_cycles" ] && echo "  ✅ BMAD Cycle History" || echo "  ❌ No cycle history"
    [ -d "reports" ] && echo "  ✅ Reporting System" || echo "  ❌ No reports directory"
    
    echo ""
    echo "🎯 Campaign Packages:"
    echo "  💰 Good Package: \$2,499 (2-min video)"
    echo "  💎 Better Package: \$6,498 (video + microsite)"
    echo "  🚀 Best Package: \$10,094 (complete suite)"
    echo "  🏢 Enterprise: \$70,082+ (with subscriptions)"
    
    echo ""
    echo "📊 Expected Performance:"
    echo "  📈 Traffic Increase: +30% (1,250 → 1,625 sessions/month)"
    echo "  🎯 Conversion Boost: +29% (3.4% → 4.4%)"
    echo "  💵 Revenue Growth: +\$162,000 annually"
    echo "  ⏱️ ROI Timeline: 1.5-9.2 months payback"
    
    # Show latest report if available
    if [ -d "reports" ] && [ "$(ls -A reports/)" ]; then
        echo ""
        echo "📋 Latest Performance Report:"
        latest_report=$(ls -t reports/bmad_report_*.md 2>/dev/null | head -1)
        if [ -n "$latest_report" ]; then
            echo "  📄 $(basename "$latest_report")"
            echo "  📅 $(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$latest_report" 2>/dev/null || stat -c "%y" "$latest_report" 2>/dev/null | cut -d' ' -f1,2)"
        fi
    fi
}

# Function to run tests
run_tests() {
    print_status "Running BMAD implementation tests..."
    
    if [ -f "test_bmad_implementation.py" ]; then
        python3 test_bmad_implementation.py && {
            print_status "All tests passed!"
        } || {
            print_warning "Some tests failed - check output above"
        }
    else
        print_warning "Test file not found"
    fi
}

# Function to show available commands
show_help() {
    echo -e "${BLUE}BMAD System Commands:${NC}"
    echo "  ./start.sh                 - 🚀 Start BMAD system with ULTRA-UNIQUE ports + auto incognito browser"
    echo "  ./start.sh deploy          - 🌐 Deploy campaign preview to production"
    echo "  ./start.sh status          - 📊 Show campaign status and metrics"
    echo "  ./start.sh test            - 🧪 Run BMAD implementation tests"
    echo "  ./start.sh report          - 📋 Generate performance report"
    echo "  ./start.sh proposal-test   - 💼 Test proposal generation system"
    echo "  ./start.sh metric NAME VAL - 📈 Record a performance metric"
    echo "  ./start.sh stop            - 🛑 Stop all processes and clean up ports"
    echo "  ./start.sh help            - ❓ Show this help"
    echo ""
    echo -e "${BLUE}Examples:${NC}"
    echo "  ./start.sh metric monthly_leads 65"
    echo "  ./start.sh metric conversion_rate 4.4"
    echo "  ./start.sh deploy"
    echo ""
    echo -e "${BLUE}🚀 ULTRA-UNIQUE Port Features:${NC}"
    echo "  🔢 Port Range: $ULTRA_UNIQUE_PORT+ (hash-generated from project path)"
    echo "  🚫 Zero Conflicts: Kills existing processes on our port range"
    echo "  🔄 Auto-Detection: Finds next available port if base is occupied"
    echo "  🧹 Clean Shutdown: Proper cleanup of all processes and ports"
    echo ""
    echo -e "${BLUE}🌐 Auto Browser Features:${NC}"
    echo "  🕵️ Incognito/Private Mode: Chrome, Safari, or Firefox"
    echo "  🧹 Cache Clearing: Local Storage, Session Storage, HTTP Cache"
    echo "  ⏱️ Health Check: Waits for server ready before launching"
    echo "  🎯 Smart Detection: Tries Chrome -> Safari -> Firefox -> Manual"
    echo ""
    echo -e "${BLUE}💾 Database Health:${NC}"
    echo "  🔍 Connection Testing: SQLite connectivity validation"
    echo "  🔧 Auto-Recovery: Recreation if database corruption detected"
    echo "  ⚡ Timeout Handling: 5-second connection timeout"
    echo "  📊 Metrics Tracking: BMAD performance data storage"
    echo ""
    echo -e "${BLUE}🎯 Professional Template Features:${NC}"
    echo "  🎨 OKLCH Blue Design System (240.325°)"
    echo "  🧮 Real-time Pricing Calculator with ROI"
    echo "  📊 Advanced Case Study Filtering (9 studies)"
    echo "  📱 Mobile-responsive Design"
    echo "  📋 Contact Forms with Validation"
    echo "  ⏱️ Process Timeline Visualization"
    echo "  🔒 Trust Indicators and Social Proof"
    echo "  📈 BMAD Methodology Applied Throughout"
}

# Function to record metric
record_metric() {
    if [ $# -ne 2 ]; then
        print_error "Usage: ./start.sh metric NAME VALUE"
        exit 1
    fi
    
    print_status "Recording metric: $1 = $2"
    python3 bmad_tracking_system.py --record-metric "$1" "$2"
}

# Main script logic
main() {
    print_header
    
    case "${1:-start}" in
        "start")
            check_python_deps
            init_bmad
            start_campaign
            show_status
            echo ""
            print_status "🎉 Benefits Video Campaign with BMAD System is running!"
            print_status "Use './start.sh help' to see available commands"
            ;;
        "deploy")
            check_python_deps
            deploy_to_production
            ;;
        "stop")
            print_status "Stopping BMAD system and cleaning up processes..."
            
            # Stop Next.js development server
            if [ -f ".server_pid" ]; then
                SERVER_PID=$(cat .server_pid)
                if kill $SERVER_PID 2>/dev/null; then
                    print_success "✅ Next.js server stopped (PID: $SERVER_PID)"
                else
                    print_warning "Server process not running"
                fi
                rm -f .server_pid
            else
                print_warning "No server PID file found"
            fi
            
            # Kill any remaining node processes on our port range
            cleanup_ports
            
            # Kill any python servers
            pkill -f "python.*http.server" 2>/dev/null && print_status "Python servers stopped" || true
            
            # Kill any node processes that might be lingering
            pkill -f "node.*next" 2>/dev/null && print_status "Next.js processes stopped" || true
            
            print_success "✅ All BMAD system processes stopped and cleaned up"
            ;;
        "status")
            show_status
            ;;
        "test")
            check_python_deps
            run_tests
            ;;
        "report")
            print_status "Generating performance report..."
            python3 bmad_tracking_system.py --report
            ;;
        "proposal-test")
            print_status "Testing proposal generation..."
            python3 bmad_tracking_system.py --test-proposal
            ;;
        "metric")
            shift  # Remove 'metric' from arguments
            record_metric "$@"
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"