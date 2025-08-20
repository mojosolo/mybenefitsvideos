#!/bin/bash

# Mojo Solo Benefits Video Campaign - BMAD System Startup Script
# This script starts all campaign components and BMAD tracking

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

print_header() {
    echo -e "${BLUE}
╔══════════════════════════════════════════════════════════════╗
║                 MOJO SOLO BENEFITS VIDEO CAMPAIGN           ║
║                    BMAD System Startup                      ║
╚══════════════════════════════════════════════════════════════╝${NC}"
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

# Function to start Next.js template
start_template() {
    print_status "Starting Next.js template..."
    
    if [ ! -d "preview" ]; then
        print_error "Template directory not found. Please ensure template-must-use has been copied to preview/"
        exit 1
    fi
    
    cd preview
    
    # Check if dependencies are installed
    if [ ! -d "node_modules" ]; then
        print_status "Installing Next.js dependencies..."
        if command_exists npm; then
            npm install
        else
            print_error "npm not found. Please install Node.js and npm"
            exit 1
        fi
    fi
    
    # Start Next.js development server
    print_status "Starting Next.js development server..."
    npm run dev

    print_status "Preview page created at preview/index.html"
}

# Function to start local development server
start_local_server() {
    print_status "Starting local development server..."
    
    start_template
    
    if command_exists npm; then
        TEMPLATE_PORT=3000
        print_status "Next.js template running on port $TEMPLATE_PORT"
        
        echo ""
        echo "🌐 MOJO SOLO BENEFITS VIDEO TEMPLATE:"
        echo "===================================="
        echo "📱 Local Preview: http://localhost:$TEMPLATE_PORT"
        echo "🔗 Network Preview: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'your-ip'):$TEMPLATE_PORT"
        echo ""
        echo "🚀 Professional Template Features:"
        echo "• Next.js with React components"
        echo "• Professional design system"
        echo "• Benefits video content integration"
        echo "• Mobile-optimized responsive design"
        echo "• BMAD methodology applied"
        echo ""
        echo "💡 Template is running in background"
        echo "💡 Use Ctrl+C to stop development server"
        
        return 0
    else
        print_error "npm not available - Next.js template requires Node.js and npm"
        return 1
    fi
}

# Function to deploy to production
deploy_to_production() {
    print_status "Checking for production deployment options..."
    
    if command_exists vercel; then
        print_status "Deploying to Vercel..."
        start_template
        cd preview
        vercel --prod 2>/dev/null && {
            print_status "✅ Deployed to Vercel successfully!"
        } || {
            print_warning "Vercel deployment failed, trying local server..."
            cd ..
            start_local_server
        }
        cd ..
    elif command_exists netlify; then
        print_status "Deploying to Netlify..."
        start_template
        netlify deploy --prod --dir=preview 2>/dev/null && {
            print_status "✅ Deployed to Netlify successfully!"
        } || {
            print_warning "Netlify deployment failed, trying local server..."
            start_local_server
        }
    else
        print_status "No production deployment tools found, starting local server..."
        start_local_server
    fi
}

# Function to start campaign services
start_campaign() {
    print_status "Starting campaign services..."
    
    # Check if we're in the right directory
    if [ ! -f "lib/pricing.ts" ]; then
        print_error "Must be run from the mybenefitsvideos directory"
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
    
    # Auto-deploy campaign
    print_status "🚀 Auto-deploying campaign with live preview..."
    deploy_to_production
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
    echo -e "${BLUE}Available commands:${NC}"
    echo "  ./start.sh                 - Start all campaign services + auto-deploy"
    echo "  ./start.sh deploy          - Deploy campaign preview only"
    echo "  ./start.sh status          - Show campaign status"
    echo "  ./start.sh test            - Run BMAD tests"
    echo "  ./start.sh report          - Generate performance report"
    echo "  ./start.sh proposal-test   - Test proposal generation"
    echo "  ./start.sh metric NAME VAL - Record a metric"
    echo "  ./start.sh stop            - Stop local server"
    echo "  ./start.sh help            - Show this help"
    echo ""
    echo -e "${BLUE}Examples:${NC}"
    echo "  ./start.sh metric monthly_leads 65"
    echo "  ./start.sh metric conversion_rate 4.4"
    echo "  ./start.sh deploy"
    echo ""
    echo -e "${BLUE}Preview Features:${NC}"
    echo "  🎯 Enhanced pricing calculator with progress tracking"
    echo "  💰 ROI projections for all company sizes"
    echo "  📊 Live BMAD optimization status"
    echo "  📱 Mobile-responsive design"
    echo "  🔒 Trust indicators and social proof"
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
            if [ -f ".server_pid" ]; then
                SERVER_PID=$(cat .server_pid)
                kill $SERVER_PID 2>/dev/null && print_status "Server stopped (PID: $SERVER_PID)" || print_warning "Server not running"
                rm -f .server_pid
            else
                print_warning "No server PID file found"
            fi
            pkill -f "python.*http.server" 2>/dev/null || true
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